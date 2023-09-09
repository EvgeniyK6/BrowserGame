import { createApple } from './apple.js';
import { rise } from './snake.js';

export let scoreBoardValue = 0;
export let secondPlayerScore = 0;


// just draw scoreboard on the screen
export function scoreBoardDraw(frame) {
    let scoreAndTimer = document.createElement("div");
    scoreAndTimer.id = "scoreAndTimer";

    let scoareboard = document.createElement("p");
    scoareboard.id = "scoreboard";
    scoareboard.innerText = "0 | 0";

    let timer = document.createElement("span");
    timer.id = "timer";
    timer.innerText = "120s";
    scoreAndTimer.append(timer);

    scoreAndTimer.appendChild(scoareboard);
    frame.appendChild(scoreAndTimer);
}

export function increaseScore(isGreenApple, player) {
    if (player == "first") {
        if (isGreenApple == true) {
            scoreBoardValue++;
            rise(1, player);
        } else {
            scoreBoardValue += 3;
            rise(3, player);
        }
        changeScore();
        createApple();
        localStorage.setItem("score", scoreBoardValue);
    } else {
        if (isGreenApple == true) {
            secondPlayerScore++;
            rise(1);
        } else {
            secondPlayerScore += 3;
            rise(3);
        }
        changeScore();
        createApple();
        localStorage.setItem("scoreSecond", secondPlayerScore);
    }
}

export function decreaseScore(player) {
    if (player == "first") {
        if (scoreBoardValue > 0) {
            scoreBoardValue--;
        }
        localStorage.setItem("score", scoreBoardValue);
    } else {
        if (secondPlayerScore > 0) {
            secondPlayerScore--;
        }
        localStorage.setItem("scoreSecond", secondPlayerScore);
    }
    changeScore();
}

function changeScore() {
    let scoreboard = document.getElementById("scoreboard");
    scoreboard.innerText = `${scoreBoardValue} |  ${secondPlayerScore}`;
}