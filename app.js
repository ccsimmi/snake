const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start");
const blockSize = 20;

const score = document.getElementById("score");

const boardColor = "white";
const snakeColor = "lightgreen";
const snakeBorderColor = "darkgreen";
const foodColor = "red";

let directionX = blockSize;
let directionY = 0;

// if snake is moving a certain direction,
// don't allow snake to move the opposite direction
let movingUp,
    movingDown,
    movingLeft = false;
let movingRight = true;

const snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
    { x: 140, y: 200 },
];

const food = {
    x: generateFoodPosition(),
    y: generateFoodPosition(),
};

drawFood();

// snakes initial position
drawSnake();

startBtn.addEventListener("click", main);
document.addEventListener("keydown", changeDirection);

function clearCanvas() {
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snakePart.x, snakePart.y, blockSize, blockSize);
    ctx.strokeStyle = snakeBorderColor;
    ctx.strokeRect(snakePart.x, snakePart.y, blockSize, blockSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function snakeMove() {
    const head = { x: snake[0].x + directionX, y: snake[0].y + directionY };

    snake.unshift(head);

    snake.pop();
}

function changeDirection(e) {
    if (e.key === "ArrowUp" && movingDown != true) {
        directionX = 0;
        directionY = -blockSize;
        movingDown = false;
        movingUp = true;
        movingRight = false;
        movingLeft = false;
    }

    if (e.key === "ArrowDown" && movingUp != true) {
        directionX = 0;
        directionY = blockSize;
        movingUp = false;
        movingDown = true;
        movingRight = false;
        movingLeft = false;
    }

    if (e.key === "ArrowRight" && movingLeft != true) {
        directionX = blockSize;
        directionY = 0;
        movingUp = false;
        movingDown = false;
        movingRight = true;
        movingLeft = false;
    }

    if (e.key === "ArrowLeft" && movingRight != true) {
        directionX = -blockSize;
        directionY = 0;
        movingUp = false;
        movingDown = false;
        movingLeft = true;
        movingRight = false;
    }
}

function generateFoodPosition() {
    const rand = Math.floor(parseInt(Math.random() * (370 - 0 + 1) * 20) / 20);
    return Math.ceil(rand / 20) * 20;
}

function genFood() {
    food.x = generateFoodPosition();
    food.y = generateFoodPosition();
}

function snakeEaten() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        let s = parseInt(score.textContent);
        s += 10;
        score.textContent = s;
        snake.push({
            x: snake[snake.length - 1] - 20,
            y: snake[snake.length - 1] - 20,
        });
        generateFoodPosition();
        genFood();
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function endGame() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - blockSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - blockSize;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function main() {
    if (endGame()) {
        return;
    }

    setTimeout(function onTick() {
        clearCanvas();
        snakeEaten();
        drawFood();
        snakeMove();
        drawSnake();
        main();
    }, 100);
}
