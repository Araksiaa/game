
let blockSize = 30;
let x = 20;
let y = 20;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let score=0;
let snakeBody = [];


let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = x * blockSize;
    board.width = y * blockSize;
   context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirection);
   
    setInterval(update, 1000/10); 
}

function placeFood() {
   
    foodX = Math.floor(Math.random() * y) * blockSize;
    foodY = Math.floor(Math.random() * x) * blockSize;
}

function update() {
    if (gameOver) {
        return;
    }
    const back= new Image();
    back.src="stars.jpg"
    
    context.fillStyle="black";
    context.drawImage(back, 0, 0, board.width, board.height);

    context.fillStyle="red"
    const alien= new Image();
    alien.src="alien.png"

    context.drawImage(alien, foodX, foodY, blockSize, blockSize);
    

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }


    if (snakeX < 0 || snakeX > y*blockSize || snakeY < 0 || snakeY > x*blockSize) {
        gameOver = true;
        alert(`Game Over: Your Score is ${score}`);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert(`"Game Over"+"" + "Your Score is"${score}`);
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


