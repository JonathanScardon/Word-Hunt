/**
 * calls displayBoardandStats() and displaySolutions() when the page loads;
 * clears data from localStorage, as it is no longer needed
 */
window.onload = function() { 
    displayBoardandStats()
    displaySolutions()
    localStorage.removeItem('gameBoardData');
    localStorage.removeItem('userData')
};

/**
 * Retrieves gameBoardData from local storage; uses it to populate endpage
 * with the board the user has played. Also retrieves userData from local
 * storage, populates it with word count and user score
 */
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

/**
 * Retrieves gameBoardData and userData from local storage. Checks words found
 * by user against solution set. Displays solution set in alphabetical order.
 * If a word was found by user, displayed in bold. 
 */
function displaySolutions(){
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    const wordsFound = new Set(userData.wordsFound);
    let solutions = "";

    for (let i = 0; i < gameBoardData.solutions.length; i++){
        let solutionText = gameBoardData.solutions[i];

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