sendData({ score: `${localStorage.getItem("score")} | ${localStorage.getItem("scoreSecond")}` });
score();

function score() {
    if (localStorage.getItem("score") == null) {
        localStorage.setItem("score", "0");
    }
    if (localStorage.getItem("scoreSecond") == null) {
        localStorage.setItem("scoreSecond", "0");
    }

    let scoreValue = `${localStorage.getItem("score")} | ${localStorage.getItem("scoreSecond")}`;
    let scoreUI = document.getElementById("score");



    scoreUI.innerText = `${scoreValue}`;
    localStorage.removeItem("score");
    localStorage.removeItem("scoreSecond");
}

function sendData(data) {
    const XHR = new XMLHttpRequest();

    const urlEncodedDataPairs = [];

    // Turn the data object into an array of URL-encoded key/value pairs.
    for (const [name, value] of Object.entries(data)) {
        urlEncodedDataPairs.push(
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        );
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behavior of browser form submissions.
    const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

    // Set up our request
    XHR.open("POST", "https://localhost:7223/GameOver");

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Finally, send our data.
    XHR.send(urlEncodedData);
}