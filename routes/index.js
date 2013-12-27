
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.chat = function(req, res){
  res.render('chat', { title: 'Chat by socket.io' })
};

exports.drawing = function(req, res){
  res.render('drawing', { title: 'PictChat by socket.io' })
};
