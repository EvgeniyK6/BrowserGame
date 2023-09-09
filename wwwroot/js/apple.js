import { increaseScore } from './scoreboard.js';

let x, y, apple, isGreen;
let period = 0;

export function createApple(horizontalSize = 79, verticalSize = 39) {
    isGreen = randomType();

    randomCoordinates(horizontalSize, verticalSize);
    apple = document.getElementById(`${y}-${x}`);
    if (isGreen) {
        apple.className = "greenApple";
    } else {
        apple.className = "redApple";
    }
    period = 8;
}

export function appleLifecycle()
{
    if (period <= 0) {
        appleDelete();
        createApple();
    }
    period--;

    setTimeout(appleLifecycle, 1000);
}

function appleDelete() {
    apple.className = '';
}

// check collision
export function appleCollision(snakeHeadX, snakeHeadY, secondPlayerX, secondPlayerY) {
    if (snakeHeadX == x && snakeHeadY == y) {
        increaseScore(isGreen, "first");
    }
    if (secondPlayerX == x && secondPlayerY == y) {
        increaseScore(isGreen, "second");
    }
}

// generate random number within the given boundaries
function randomCoordinates(horizontalSize, verticalSize) {
    x = Math.floor(Math.random() * (horizontalSize - 1)) + 1;
    y = Math.floor(Math.random() * (verticalSize - 1)) + 1;
}

function randomType() {
    let type = Math.floor(Math.random() * 10) < 8;
    return type;
}