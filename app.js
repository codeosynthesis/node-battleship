
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Battleship=require('./battleship');
  
  //start a socket for each user

/*
    clients array [
        1: {socket:Socket,board:Battleship}
        ...
        ]
*/
//initalize client's instance of a battleship board
global.clients=new Array(2);
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
//fire method
/*
var fire = function(req, res){
    //req.user //req.x req.y
    res.send('user = '+req.user);
    res.send('x = '+req.x);
    res.send('y = '+req.y);
    /*  
        if user = player1
        clients[1].board.checkHit(req.x,req.y)
    */
//} */
// Routes
app.get('/player1',routes.player1);
app.get('/player2',routes.player2);
app.get('/fire/:player/:x/:y',routes.fire);
app.get('/', routes.index);
console.log(routes.index);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var io=require('socket.io').listen(app);
io.sockets.on('connection',function(socket)
{
    console.log('user connected');
    socket.emit('Welcome',{'welcome':'from server welcome'});
    socket.on('Register',function(data){
        console.log('recieved register');
        console.log(data);
        clients[data.id-1].socket=socket;
        socket.emit('Game',{'game':clients[data.id-1].board});
    });
});
