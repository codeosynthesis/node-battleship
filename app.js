
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , sio=require('socket.io')
  , Battleship=require('./battleship');
  
  //start a socket for each user
  var socket=sio.listen(3001);

/*
    clients array [
        1: {socket:Socket,board:Battleship}
        ...
        ]
*/
//initalize client's instance of a battleship board
var clients=new Array(2);
clients[0]={};
clients[0].board=new Battleship();
clients[1]={};
clients[1].board=new Battleship();

/*
    temp block for  placing ships
*/
var i =0;
for (var ship in clients[0].board.ships)
{
    clients[0].board.placeShip(ship,4,i,0);
    clients[1].board.placeShip(ship,9,i,0);
    i++;
}

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
app.get('/player2',routes.player2);
app.get('/fire/:player/:x/:y',routes.fire);
app.get('/', routes.index);
console.log(routes.index);

socket.sockets.on('connection', function(socket){
    socket.emit('Welcome',{msg:'Welcome to Battleship ','socket':socket});
    socket.on('register',function(data){
        
    });
});


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
