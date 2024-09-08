window.onload = function() {
    displayBoard();
    displaySolutions();
    localStorage.removeItem(gameBoardData);
};


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
