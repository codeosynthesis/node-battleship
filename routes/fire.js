
/*
 * GET home page.
 */

exports.fire = function(req, res){
    //req.user //req.x req.y
    

    var val = new Validation()
    if (val.isUserIdValid(req.params.player) === false || val.isWithBounds(req.params.y) === false || val.isWithBounds(req.params.x) === false) {
    	res.send('Invalid Params');
    }
    var ret='user = '+req.params.player;
    ret+='x = '+req.params.x;
    ret+='y = '+req.params.y;
    ret+= global.clients;
    res.send(ret);

};

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