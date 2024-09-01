window.onload = function() {
    
    displayBoard()
    displaySolutions()
  
    // Clear data from localStorage if no longer needed
    //localStorage.removeItem('gameBoardData');
    //localStorage.removeItem('userData')
};

function displayBoard(){
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-element');
    
    for (let i = 0; i < gridItems.length; i++){
        let row = gridItems[i].getAttribute('x');
        let col = gridItems[i].getAttribute('y');
        gridItems[i].textContent = gameBoardData.board[row][col]
    }
}


function displaySolutions(){
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    const userData = JSON.parse(localStorage.getItem('userData'));


    if (!userData) {
        console.error('No userData found in localStorage');
    }





    const wordsFound = new Set(userData.wordsFound);
    let solutions = "";

    for (let i = 0; i < gameBoardData.solutions.length; i++){
        let solutionText = gameBoardData.solutions[i];

        // Check if the solution is in wordsFound and apply italics if true
        if (wordsFound.has(solutionText)) {
            solutionText = `<i>${solutionText}</i>`;
        }

        solutions += (i + 1) + ". " + solutionText + "<br>";
    }

    document.getElementById('solutions-content').innerHTML = solutions;
}