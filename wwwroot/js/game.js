import { tablegeneration } from './generateMap.js';
import { draw, move } from './snake.js';
import { createApple, appleLifecycle } from './apple.js';
import { scoreBoardDraw } from './scoreboard.js';
import { countdown } from './timer.js';

// Settings
const horizontalCells = 80;
const verticalCells = 40;
let mainFrame = document.getElementById("mainFrame");

main();

function main() {
    // Draw scoreboard
    scoreBoardDraw(mainFrame);
    // Generate table
    tablegeneration(mainFrame, horizontalCells, verticalCells);
    // Time countdown
    countdown();
    // Init drawing
    draw();
    // create apple
    createApple(horizontalCells, verticalCells);
    // apple lifecycle
    appleLifecycle();
    // Check moves
    move();
}
