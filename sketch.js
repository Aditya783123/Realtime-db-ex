

var ball,database;
var position;

function setup(){
    database = firebase.database();

    createCanvas(500,500);

    ball = createSprite(100,100,10,10);
    ball.shapeColor = "red";
    
    //database.ref is used to refer to the database table
    var ballPosition = database.ref('ball/position');
    //listeners - listen to events
    // on the value change of ball position, call readPOsiton function,
    // if there is any error then call showError Function
    ballPosition.on("value",readPosition,showError);
}

//read the values of data
function readPosition(data){
    // get the position from data value
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
    console.log(ball.x);
    console.log(ball.y);
}

function showError(){
    console.log("There was some error in reading data");
}

// write the changes to database
function writePosition(x,y){ // 200,200

    //.set is used to set the values to the database table
    database.ref('ball/position').set({
        'x': ball.x + x, //200 + (-1) = 199
        'y': ball.y + y // 200 + 0 = 200
    })
}

function draw(){
    background("white");
    if(position != undefined){
        if(keyDown(LEFT_ARROW)){ 
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0, 1);
        }
        drawSprites();
    }
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
