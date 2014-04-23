.load battleship/index.js
var test = new Battleship();
var test2 = new Battleship();

var i=0;
for (var ship in test.ships)
{
    console.log('placing '+ship+'-'+'4'+'-'+i+'-0');
    test.placeShip(ship,4,i,0);
    test2.placeShip(ship,9,i,0);
    i++;
}
function chk()
{
    console.log('Player 1');
    test.showBoards();
    console.log();
    console.log('Player 2');
    test2.showBoards();
}
function p1(x,y)
{
    var ret=test.getHitConfirm(test2.checkHit(x,y));
    chk();
    return ret;
}
function p2(x,y)
{
    var ret=test2.getHitConfirm(test.checkHit(x,y));
    chk();
    return ret;
}

p1(1,1);
p2(1,1);
p1(8,2);
p2(8,2);
