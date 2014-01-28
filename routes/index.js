
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.drawing = function(req, res){
  res.render('drawing', { title: 'PictChat by socket.io' })
};
