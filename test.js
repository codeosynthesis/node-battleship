.load battleship/index.js
var test = new Battleship();

var i=0;
for (var ship in test.ships)
{
    console.log('placing '+ship+'-'+'4'+'-'+i+'-0');
    test.placeShip(ship,4,i,0);
    i++;
}

test.showBoards();
