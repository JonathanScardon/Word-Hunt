import { GameBoard } from './GameBoard.js';
let gameBoardInstance;


window.onload = function() {
    displayBoard();
    solve();
};


function displayBoard(){
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-element');
    const userBoard = JSON.parse(localStorage.getItem('userBoard'));
    
    for (let i = 0; i < gridItems.length; i++){
        let row = gridItems[i].getAttribute('x');
        let col = gridItems[i].getAttribute('y');
        gridItems[i].textContent = userBoard[row][col]
    }

}


function solve(){
    const userBoard = JSON.parse(localStorage.getItem('userBoard'));

    gameBoardInstance = new GameBoard()
    gameBoardInstance.createCustomBoard(userBoard);
    gameBoardInstance.parseEnglishDict();

    let s = gameBoardInstance.getSolutions();
    console.log(s);


    localStorage.setItem('gameBoardData', JSON.stringify(gameBoardInstance.toJSON()));
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    console.log(gameBoardData);
    console.log(gameBoardData.solutions)

}
