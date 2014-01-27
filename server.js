/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var Log = require('log')
  , log = new Log( Log.INFO );
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get( '/', routes.index );
app.get( '/chat', routes.chat );
app.get( '/drawing', routes.drawing );

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8000, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

//socket
var pData = new Array();
var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
	socket.emit('message-init', JSON.stringify(pData));
	socket.on('message', function (msg) {
		var recieveData = JSON.parse(msg);
		if (recieveData['type'] == 'clear') {
			pData.length = 0;
		}
		else if(recieveData['type'] == 'draw' || recieveData['type'] == 'string') {
			pData.push(recieveData);
		}
		//socket.emit('message', msg);
		socket.broadcast.emit('message', msg);
		//console.log(recieveData);
		//console.log(pData);
	});
	socket.on('disconnect', function() {
		log.info('disconnected');
	});
});
