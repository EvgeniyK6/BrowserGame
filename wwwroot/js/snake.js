import { appleCollision } from './apple.js';
import { decreaseScore } from './scoreboard.js';

let bodyCoordinates = [{ x: 1, y: 20 }, { x: 2, y: 20 }];
let secondBodyCoordinates = [{ x: 1, y: 21}, { x: 2, y: 21}];
let xVelosity = 0, yVelosity = 0;
let xSecondVelosity = 0, ySecondVelosity = 0;
let speed = 10;

export function move() {
    checkInput();
    // move (first player)
    for (let i = bodyCoordinates.length - 1, j = i - 1; i >= 0; i--, j--) {
        if (i == 0) {
            bodyCoordinates[i].x = bodyCoordinates[i].x + xVelosity;
            bodyCoordinates[i].y = bodyCoordinates[i].y + yVelosity;
        } else {
            bodyCoordinates[i].x = bodyCoordinates[j].x;
            bodyCoordinates[i].y = bodyCoordinates[j].y;
        }
    }
    // move (second player)
    for (let i = secondBodyCoordinates.length - 1, j = i - 1; i >= 0; i--, j--) {
        if (i == 0) {
            secondBodyCoordinates[i].x = secondBodyCoordinates[i].x + xSecondVelosity;
            secondBodyCoordinates[i].y = secondBodyCoordinates[i].y + ySecondVelosity;
        } else {
            secondBodyCoordinates[i].x = secondBodyCoordinates[j].x;
            secondBodyCoordinates[i].y = secondBodyCoordinates[j].y;
        }
    }

    checkBoundary();
    clear();
    draw();
    appleCollision(bodyCoordinates[0].x, bodyCoordinates[0].y, secondBodyCoordinates[0].x, secondBodyCoordinates[0].y);
    // loop function over again
    setTimeout(move, 1000/speed);
}

export function draw() {
    for (let i = 0; i < bodyCoordinates.length; i++) {
        let element = document.getElementById(`${bodyCoordinates[i].y}-${bodyCoordinates[i].x}`);
        element.className = "snake-body";
    }
    for (let i = 0; i < secondBodyCoordinates.length; i++) {
        let element = document.getElementById(`${secondBodyCoordinates[i].y}-${secondBodyCoordinates[i].x}`);
        element.className = "second-player";
    }
}

export function rise(count, player) {
    let lastElement = bodyCoordinates[bodyCoordinates.length - 1];
    let newElement = { x: lastElement.x, y: lastElement.y };

    let secondLastElement = secondBodyCoordinates[secondBodyCoordinates.length - 1];
    let secondNewElement = { x: secondLastElement.x, y: secondLastElement.y };

    if (player == "first") {
        if (count == 1) {
            bodyCoordinates.push(newElement);
        } else {
            for (let i = 1; i <= 3; i++) {
                let element = { x: lastElement.x, y: lastElement.y };
                bodyCoordinates.push(element);
            }
        }

        draw();
        speed++;
    } else {
        if (count == 1) {
            secondBodyCoordinates.push(secondNewElement);
        } else {
            for (let i = 1; i <= 3; i++) {
                let element = { x: secondLastElement.x, y: secondLastElement.y };
                secondBodyCoordinates.push(element);
            }
        }

        draw();
        speed++;
    }
}

function clear() {
    let all = document.querySelectorAll("*");
    all.forEach(element => {
        element.classList.remove("snake-body");
        element.classList.remove("second-player");
    });
}

function checkInput() {
    window.addEventListener("keydown", function (event) {
        const key = event.key;

        // first player input
        switch (key) {
            case "ArrowRight":
                if (xVelosity == -1) {
                    break;
                }
                xVelosity = 1;
                yVelosity = 0;
                break;
            case "ArrowLeft":
                if (xVelosity == 1) {
                    break;
                }
                xVelosity = -1;
                yVelosity = 0;
                break;
            case "ArrowUp":
                if (yVelosity == 1) {
                    break;
                }
                xVelosity = 0;
                yVelosity = -1;
                break;
            case "ArrowDown":
                if (yVelosity == -1) {
                    break;
                }
                xVelosity = 0;
                yVelosity = 1;
                break;

            // second player input
            case "d":
                if (xSecondVelosity == -1) {
                    break;
                }
                xSecondVelosity = 1;
                ySecondVelosity = 0;
                break;
            case "a":
                if (xSecondVelosity == 1) {
                    break;
                }
                xSecondVelosity = -1;
                ySecondVelosity = 0;
                break;
            case "w":
                if (ySecondVelosity == 1) {
                    break;
                }
                xSecondVelosity = 0;
                ySecondVelosity = -1;
                break;
            case "s":
                if (ySecondVelosity == -1) {
                    break;
                }
                xSecondVelosity = 0;
                ySecondVelosity = 1;
                break;
        }
    });
}

export function detach(player) {
    if (player == "first") {
        bodyCoordinates.pop();
    } else {
        secondBodyCoordinates.pop();
    }
}

function checkBoundary() {
    if (bodyCoordinates[0].x < 1 || bodyCoordinates[0].x > 80)
    {
        bodyCoordinates[0] = {x: bodyCoordinates[1].x, y: bodyCoordinates[1].y};
        xVelosity = -xVelosity;
        if (bodyCoordinates.length > 2) {
            detach("first");
        }
        decreaseScore("first");
    }
    if (bodyCoordinates[0].y < 1 || bodyCoordinates[0].y > 40)
    {
        bodyCoordinates[0] = { x: bodyCoordinates[1].x, y: bodyCoordinates[1].y };
        yVelosity = -yVelosity;
        if (bodyCoordinates.length > 2) {
            detach("first");
        }
        decreaseScore("first");
    }


    // second player
    if (secondBodyCoordinates[0].x < 1 || secondBodyCoordinates[0].x > 80)
    {
        secondBodyCoordinates[0] = { x: secondBodyCoordinates[1].x, y: secondBodyCoordinates[1].y };
        xSecondVelosity = -xSecondVelosity;
        if (secondBodyCoordinates.length > 2) {
            detach("second");
        }
        decreaseScore("second");
    }
    if (secondBodyCoordinates[0].y < 1 || secondBodyCoordinates[0].y > 40) {
        secondBodyCoordinates[0] = { x: secondBodyCoordinates[1].x, y: secondBodyCoordinates[1].y };
        ySecondVelosity = -ySecondVelosity;
        if (secondBodyCoordinates.length > 2) {
            detach("second");
        }
        decreaseScore("second");
    }
}