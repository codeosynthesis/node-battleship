
/*
 * GET home page.
 */

exports.fire = function(req, res){
    //req.user //req.x req.y
    
    var ret='user = '+req.params.player;
    ret+='x = '+req.params.x;
    ret+='y = '+req.params.y;
    ret+=global.clients;
    res.send(ret);
    /*
        if user = player1
        clients[1].board.checkHit(req.x,req.y)
    */

};
