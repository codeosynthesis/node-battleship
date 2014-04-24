
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

};
