
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , sio=require('socket.io')
  , battleship=;
  
  var p1Socket=sio.listen(3001);
  var p2Socket=sio.listen(3002);

/*
    clients array [
        1: {socket:Socket,board:Battleship}
        ...
        ]
*/
var clients=new Array(2);
clients[1]={};
clients[1].board=new Battleship();
clients[2]={};
clients[2].board=new Battleship();

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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
app.get('/player1',routes.player1);
console.log(routes.player1);
app.get('/player2',routes.player2);
app.get('/fire/:player/:x/:y',routes.fire);
app.get('/', routes.index);
console.log(routes.index);

p1Socket.sockets.on('connection', function(socket){
    socket.emit('server',{msg:'Welcome to Battleship Player 1'});
    clients[1].socket=socket;
});


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
