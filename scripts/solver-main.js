/**
 * calls displayBoard() and displaySolutions() when the page loads;
 * clears data from localStorage, as it is no longer needed
 */
window.onload = function() {
    displayBoard();
    displaySolutions();
    localStorage.removeItem(gameBoardData);
};

/**
 * Retrieves gameBoardData from local storage, uses it to populate endpage
 * with the board input by the user
 */
function displayBoard(){
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-element');
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    
    for (let i = 0; i < gridItems.length; i++){
        let row = gridItems[i].getAttribute('x');
        let col = gridItems[i].getAttribute('y');
        gridItems[i].textContent = gameBoardData.board[row][col]
    }

}

/**
 * Retrieves gameBoardData and displays solution set in alphabetical order.
 */
function displaySolutions(){
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    let solutionText = "";

    console.log(gameBoardData.solutions)

    for (let i = 0; i < gameBoardData.solutions.length; i++){
        let word = gameBoardData.solutions[i];
        console.log(word)
        solutionText += (i + 1) + ". " + word + "<br>";
    }
    document.getElementById('solutions-content').innerHTML = solutionText;
}
