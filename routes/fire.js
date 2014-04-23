
/*
 * GET home page.
 */

exports.fire = function(req, res){
    //req.user //req.x req.y
    res.send('user = '+req.user);
    res.send('x = '+req.x);
    res.send('y = '+req.y);
};
