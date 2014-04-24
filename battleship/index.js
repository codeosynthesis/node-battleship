//less typing
var d=function(x){console.log(x);}
/**
    //top Board represetns shots you've taken
    //bot Borard repesents your ships and opponents shots
    // 0 = empty, 1 = miss, 2 = hit 3 = ship
*/
function Battleship(){
    //create board to represent top half of battleship board
    this.topBoard= Battleship.createboard();
    //create board to represent bottom half of board
    this.botBoard= Battleship.createboard();
    
    //loop through all ships and calculate how many hits you can take
    var keys = Object.keys(this.ships);
    this.health=0;
    for (var i in keys)
    {
        this.health+=this.ships[keys[i]].size;
    }
}

//number of spaces on the board
Battleship.size=10;

//draw board on page client side
//take id of div to draw in
Battleship.prototype.render=function(divid){
    
    //get div and clear it
    var div = document.getElementById(divid);
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

    //create a div for each board
    var topboard=document.createElement('div');
    var botboard=document.createElement('div');
    
    //loop through each row
    for (var i=0; i<Battleship.size; i++)
    {
        //create a row for the top board
        var dt=document.createElement('div'); 
        dt.setAttribute('class','row');
        
        //create a row for the bottom row
        var db=document.createElement('div');
        db.setAttribute('class','row');

        //loop thorugh each cell in the row
        for (var j=0; j<Battleship.size;j++)
        {
           var el = document.createElement('div');
            
            //place node for top board with clas indicating location
           el.setAttribute('class','top-'+i+'-'+j+' space');
           
           if(this.topBoard[i][j]==0)
           {
               el.setAttribute('onclick','fire(this)');
           }

           //add in value of cell for easy debugging 
           el.appendChild(document.createTextNode(this.topBoard[i][j]));
           dt.appendChild(el);
            
           //same as above
           el=document.createElement('div');
           el.setAttribute('class','bot-'+i+'-'+j+' space');
           el.appendChild(document.createTextNode(this.botBoard[i][j]));
           db.appendChild(el);
        }
        //add rows to boards
        topboard.appendChild(dt);
        botboard.appendChild(db);
    }
    //add boards to page
    div.appendChild(topboard);
    div.appendChild(botboard);
}

//used in ss debugin, prints out user friendly represntation of the board
Battleship.prototype.showBoards=function(){
    var len=this.topBoard.length;
    for (var i =0; i<len;i++)
    {
        var line='|';
        var wid=this.topBoard[i].length;
        for (var j=0;j<wid;j++)
        {
            line+=this.topBoard[i][j];
        }
        line +='|  |';
        for (var j=0;j<this.botBoard[i].length;j++)
        {
            line+=this.botBoard[i][j];
        }
        console.log(line+'|');
    }
}

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
    console.log('check hit at '+x+','+y);
    var hit=false;
    var ship=null;
    if (this.botBoard[x][y]==3)
    {
        d('hit');
        this.botBoard[x][y]=2;
        hit=true;
         
        //TODO - find what ship wasa hit
        //temp
        ship=Object.keys(this.ships)[y]; 
        //temp
    }
    else
    {
        this.botBoard[x][y]=1;
    }
    return {"hit":hit,"ship":ship,"x":x,"y":y}
}

//update board with data from a shot take at opponetns b0oard
//takes object returned by opponentBoard.checkHit(x,y)
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

//place ship on board after validating its position
Battleship.prototype.placeShip=function(shipname,x,y,dir)
{
    d('placing ship '+shipname+ ' at '+x+','+y + ' facing '+dir);
    switch (dir)
    {
        case 0:
            if( (x - this.ships[shipname].size) < -1 )
            {
                return false;
            }            
            else 
            {
                console.log('locaton valid');
                
                for (var i=0;i<this.ships[shipname].size;i++)
                {
                    if(this.botBoard[x-i][y]==3)
                    {
                        return false;
                    }
                }

                console.log('valid position');
                
                this.ships[shipname].x=x;
                this.ships[shipname].y=y;
                this.ships[shipname].dir=dir;
                
                for (var i=0;i<this.ships[shipname].size;i++)
                {
                    this.botBoard[x-i][y]=3;
                }

                console.log('placed');

            }
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

//export module for use in node
try{
module.exports=Battleship;
} catch (e)
{
}
