
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Battleship=require('./battleship');

global.server='vm-0.jjw9128.kd.io';

//initalize client's instance of a battleship board
global.clients=new Array(2);
global.sanity=false;
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
  //set up views directory
  app.set('views', __dirname + '/views');
  //use jade template engine
  app.set('view engine', 'jade');
  //parse request to pull out information
  //such as cookie data ro post data
  app.use(express.bodyParser());
  //override http methods
  app.use(express.methodOverride());
  //use routes
  app.use(app.router);
  //serve files in the public directory statically
  app.use(express.static(__dirname + '/public'));
});

//uses process.env.NODE_ENV  to determine whicch to use
//show extra information when running in development env
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//import validate functions from routes
routes.validate(app);
// Routes
app.get('/player1',routes.player1);
app.get('/player2',routes.player2);
app.get('/fire/:player/:x/:y',routes.fire);
app.get('/', routes.index);
console.log(routes.index);

//start server 
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

//start sockets
var io=require('socket.io').listen(app);

//handle new socket connections
io.sockets.on('connection',function(socket)
{
    //handshake
    //console.log('user connected');
    socket.emit('Welcome',{'welcome':'from server welcome'});
    
    //register user
    socket.on('Register',function(data){
       // console.log('recieved register');
       // console.log(data);
       //store socket globally so it can be accessed later
       clients[data.id-1].socket=socket;
       //send the current game status to the client
       socket.emit('Game',{'game':clients[data.id-1].board});
    });
});
