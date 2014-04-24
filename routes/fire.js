//rules for managing request to the server.fire

exports.fire = function(req, res){
   //player 1 fired a shot at player 2
   if (req.params.player=='player1'&& (global.sanity=='player1'|| !global.sanity))
    {
       //ask player2's board if tehy hit anything and update the board
       var reply= global.clients[1].board
            .checkHit(req.params.x,req.params.y);
       //update player1's server side game
       global.clients[0].board.getHitConfirm(reply);
       //update player2's client side game
       clients[1].socket.emit('Shot',{'x':req.params.x,'y':req.params.y});
       //send response to update player1's client side game
       res.json(reply)
       if(global.sanity){global.sanity='player2';}
    }
    //same as above but for player 2
    else if (req.params.player=='player2'&& (global.sanity=='player2'|| !global.sanity))
    {
       var reply= global.clients[0].board
            .checkHit(req.params.x,req.params.y);
       global.clients[1].board.getHitConfirm(reply);
       clients[0].socket.emit('Shot',{'x':req.params.x,'y':req.params.y});
       res.json(reply)
       if (global.sanity){global.sanity='player1'};
    }
    //this should have been handled earlier
    else
    {
        res.send(201);
    }

};
exports.validate = function(app){
    //validate that the request is from player1 or player2
    app.param('player',function(req,res,next,id)
    {
        if(id=='player1' || id=='player2')
        {
            next();
        }
        else
        {
            res.send('invalid player');
        }
    });
    //TODO load numbers for Battleship
    //check that the x cordinate if valid
    app.param('x',function(req,res,next,id)
    {
        if(id<10 && id>=0)
        {
            next();
        }
        else
        {
            res.send('invalid x');
        }
    });
    //check that the y cordinate is valid
    app.param('y',function(req,res,next,id)
    {
        if(id<10 && id>=0)
        {
            next();
        }
        else
        {
            res.send('invalid y');
        }
    });


}
/*
var Validation = function() {

}

Validation.prototype.isWithBounds = function(x) {
	if(x > 10){
		return false;
	}else{
		return true;
	}
}

Validation.prototype.isUserIdValid = function(y) {
	if (y === 'player1' || y === 'player2') {
		return true
	} else{
		return false;
	}
};

    /*
        if user = player1
        clients[1].board.checkHit(req.x,req.y)
    */
    /*
    var val = new Validation()
    if (val.isUserIdValid(req.params.player) === false || val.isWithBounds(req.params.y) === false || val.isWithBounds(req.params.x) === false) {
    	res.send('Invalid Params');
    }
    var ret='user = '+req.params.player;
    ret+='x = '+req.params.x;
    ret+='y = '+req.params.y;
    ret+= global.clients;
    res.send(ret);
    */


