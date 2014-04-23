/**
    //top Board represetns shots you've taken
    //bot Borard repesents your ships and opponents shots
    // 0 = empty, 1 = miss, 2 = hit 3 = ship
*/
var d=function(x){console.log(x);}
function Battleship(){
    this.topBoard= Battleship.createboard();
    this.botBoard= Battleship.createboard();
    var keys = Object.keys(this.ships);
    this.health=0;
    for (var i in keys)
    {
        this.health+=this.ships[keys[i]].size;
    }
}

//number of spaces on the board
Battleship.size=15;

//list of ships
//x an y or back of ship, dir  is 0 north 1 east 2 south 3 west
Battleship.prototype.ships={
    "Destroyer":{
        "size":2,
        "x":null,
        "y":null,
        "dir":null
    },
    "Carrier":{
        "size":5,
        "x":null,
        "y":null,
        "dir":null
    },
    "Battleship":{
        "size":5,
        "x":null,
        "y":null,
        "dir":null
    },
    "Cruiser":{
        "size":3,
        "x":null,
        "y":null,
        "dir":null
    },
    "Submarine":{
        "size":3,
        "x":null,
        "y":null,
        "dir":null
    }
}


//creates a 2d array representing a face of the board
Battleship.createboard=function(){
    var ret=new Array();
    for (var i =0; i< Battleship.size;i++)
    {
        var tmp=new Array();
        for (var j=0; j<Battleship.size;j++)
        {
            tmp[j]=0;
        }
        ret[i]=tmp;
    }
    return ret;
}

//check if an opponent's shot has hit
//takes x and y cordinates
Battleship.prototype.checkHit=function(x,y)
{
    //TODO logic for hit detection
    //update number on client
    return {"hit":true,"ship":"battleship","x":x,"y":y}
}

Battleship.prototype.getHitConfirm=function(hit)
{
    if(hit.hit)
    {
        this.topBoard[hit.x][hit.y]=2;
    }
    else
    {
        this.topBoard[hit.x][hit.y]=1;
    }
}

Battleship.prototype.placeShip=function(shipname,x,y,dir)
{
    switch (dir)
    {
        case 0:
            if((y - this.ships.shipname.size) < 0 ){return false;}            
            break;
        case 1:
            if((this.ships.shipname.size + x) > Battleship.size){return false;}            
            break;
        case 2:
            if((this.ships.shipname.size + y) > Battleship.size){return false;}            
            break;
        case 3:
            if((x- this.ships.shipname.size) <0){return false;}            
            break;
        default: 
            return false;
            break;
        return true;
    }
}

//Battleship.prototype.checkWin

module.exports=Battleship;
