
/*
 * GET home page.
 */

exports.fire = function(req, res){
    //req.user //req.x req.y
    
    if (req.params.player=='player1')
    {
       var reply= global.clients[1].board
            .checkHit(req.params.x,req.params.y);
       global.clients[0].board.getHitConfirm(reply);
       clients[1].socket.emit('Shot',{'x':req.params.x,'y':req.params.y});
       res.json(reply)
    }
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

};
exports.validate = function(app){
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
*/
