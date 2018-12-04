//Settings
var snakeX = 2;
var snakeY = 2;
var width = 40;
var height = 20;
var increment = 1;
var interval = 150;
var length = 1;

//Game Settings
var tailX = [snakeX];
var tailY = [snakeY];
var coinX;
var coinY;
var running = false;
var gameOver = false;
var direction = 2; // up = 0, down = -1, left = 1, right = 2
var int;

/*
 * Runs Game
 */
function run() {
    init();
    int = setInterval(gameLoop, interval);
}

/*
 * Initializes world and actors
 */
function init() {
    createWorld();
    createSnake();
    createCoin();
}

/*
 * Creates World
 */
function createWorld() {
    document.write("<table>");

    for (var y = 0; y < height; y++){
        document.write("<tr>");

            for (var x = 0; x < width; x++){

                if (x == 0 || y == 0 || x == width - 1 || y == height - 1){
                    document.write("<td class='wall' id='" + x + "-" + y + "'></td>");
                }else{
                    document.write("<td class='blank' id='" + x + "-"+ y + "'></td>");
                }

                
            }

        document.write("</tr>");
    }

    document.write("</table>");
    document.write("<div style='color:white;' id='scoreLabel'>");
    document.write("Score: " + (length - 1));
    document.write("</div>");
}

/*
 * Creates Snake actor
 */
function createSnake(){
    set(snakeX, snakeY, "snake");
}

/*
 * Creates fruit actor
 */
function createCoin(){
    var placed = false;

    while(!placed){
        coinX = Math.floor(Math.random() * (width - 1) + 1);
        coinY = Math.floor(Math.random() * (height - 1) + 1);
        if (document.getElementById(coinX + "-" + coinY).getAttribute("class") == "blank"){
            placed = true;
        }
    }

    set(coinX, coinY, "coin");
}

function get(x1, y1){
    return document.getElementById(x1 + "-" + y1);
}

function set(x1, y1, value){
    get(x1, y1).setAttribute("class", value);
}

window.addEventListener("keypress", function key(){
    var key = event.keyCode;

    //Key is W
    if (direction != -1 && (key == 119 || key == 87))
        direction = 0;
    //Key is S
    else if (direction != 0 && (key == 115 || key == 83))
        direction = -1;
    //Key is A
    else if (direction != 2 && (key == 97 || key == 65))
        direction = 1;
    //Key is D
    else if (direction != 1 && (key == 100 || key == 68))
        direction = 2;

    if (!running){
        running = true;
    } else if (key == 32){
        running = false;
    } else if ((key == 114 || key == 82) && gameOver){
        clearAndRestart();
    }
});

function gameLoop(){
    if (running && !gameOver){
        update();
    } else if (gameOver){
        clearInterval(int);
    }
}

function update(){
    set(coinX, coinY, "coin");
    
    set(tailX[tailX.length - 1], tailY[tailY.length - 1], "blank");

    if (direction == 0){
        snakeY--;
    }else if (direction == -1){
        snakeY++;
    }else if (direction == 1){
        snakeX--;
    }else if (direction = 2){
        snakeX++;
    }
    
    if (get(snakeX, snakeY).getAttribute("class") == "snake"){
        gameOver = true;
    }

    if (get(snakeX, snakeY).getAttribute("class") == "coin"){
        length++;
        createCoin();
    }

    set(snakeX, snakeY, "snake");

    updateTail();

    if (snakeX == 0 || snakeX == width - 1 || snakeY == 0 || snakeY == height - 1) {
        gameOver = true;
    }

    document.getElementById("scoreLabel").innerHTML = "Score: " + (length - 1)
}

function updateTail(){
    for (var i = length - 1; i > 0; i--){
        tailX[i] = tailX[i - 1];
        tailY[i] = tailY[i - 1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

function clearAndRestart(){
    for (var i = length - 1; i >= 0; i--){
        if (tailX[i] == 0 || tailX[i] == width - 1 || tailY[i] == 0 || tailY[i] == height - 1){
            set(tailX[i], tailY[i], "wall");    
        } else{
            set(tailX[i], tailY[i], "blank");
        }
    }

    set(coinX, coinY, "blank");

    length = 1;
    snakeX = 2;
    snakeY = 2;
    tailX = [snakeX];
    tailY = [snakeY];
    running = false;
    gameOver = false;
    direction = 2;

    createSnake();
    createCoin();

    int = setInterval(gameLoop, interval);
}

run();