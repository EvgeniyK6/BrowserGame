export function tablegeneration(mainFrame, cellsX, cellsY) {
    // create table
    const table = document.createElement("table");
    const scoreboard = document.getElementById("scoreboard");

    let scoreBoardHeight;
    if (scoreboard != null) {
        scoreBoardHeight = scoreboard.offsetHeight;
    }
    
    const cellWidth = window.window.innerWidth / cellsX;
    const cellHeight = (window.window.innerHeight - scoreBoardHeight - 1) / cellsY;

    // rows
    for (let i = 1; i <= cellsY; i++) {
        let tableRow = document.createElement("tr");
        // columns
        for (let j = 1; j <= cellsX; j++) {
            let cell = document.createElement("td");
            cell.id = `${i}-${j}`;
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;

            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
    }

    mainFrame.appendChild(table);
}