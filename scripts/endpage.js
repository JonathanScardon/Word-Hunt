window.onload = function() {
    
    displayBoardandStats()
    displaySolutions()
  
    // Clear data from localStorage if no longer needed
    //localStorage.removeItem('gameBoardData');
    localStorage.removeItem('userData')
};

function displayBoardandStats(){
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-element');
    
    for (let i = 0; i < gridItems.length; i++){
        let row = gridItems[i].getAttribute('x');
        let col = gridItems[i].getAttribute('y');
        gridItems[i].textContent = gameBoardData.board[row][col]
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    document.getElementById('word-count-data').textContent = userData.numWordsFound;
    document.getElementById('score-data').textContent = userData.score;
}


function displaySolutions(){
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    const wordsFound = new Set(userData.wordsFound);
    let solutions = "";

    for (let i = 0; i < gameBoardData.solutions.length; i++){
        let solutionText = gameBoardData.solutions[i];

        // Check if the solution is in wordsFound and apply italics if true
        if (wordsFound.has(solutionText)) {
            solutionText = `<b>${ (i + 1) + ". " + solutionText}</b>` + "<br>";
        }
        else{
            solutionText = (i + 1) + ". " + solutionText + "<br>";
        }

        solutions += solutionText;
    }

    document.getElementById('solutions-content').innerHTML = solutions;

}