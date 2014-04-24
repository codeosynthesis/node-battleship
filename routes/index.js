//main file imported fro roots
//serve a basic index file
//as well as exports form other files in the package
exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.fire=require('./fire.js').fire;
exports.player1=require('./player1.js').player1;
exports.player2=require('./player2.js').player2;
exports.validate=require('./fire.js').validate;




