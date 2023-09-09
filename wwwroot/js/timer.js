let seconds = 100;


export function countdown() {
    if (seconds <= 0) {
        window.location.replace("GameOver");
    }
    let timer = document.getElementById("timer");
    seconds--;
    timer.innerText = seconds;

    setTimeout(countdown, 1000);
}