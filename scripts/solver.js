import { GameBoard } from './game-board.js';
let gameBoardInstance

/**adds event listener to solve button; calls function checkSolvable when clicked*/
document.addEventListener('DOMContentLoaded', () => {
    const solveButton = document.querySelector('.solve-button');
    solveButton.addEventListener('click', checkSolvable);
});

/*checks if user has input a valid custom board. if true, then redirect to solverEndpage.html and save board in
local storage to be reloaded on that page. if false, alerts user to submit a valid board
*/
function checkSolvable(){
    const inputs = document.querySelectorAll('.letter-input');
    let validInputs = true;

    inputs.forEach(input => {
        if (!isLetter(input.value)) {
            validInputs = false;
        }
    })

    if (validInputs){
        let userBoard = []
        let row = []

        inputs.forEach((input, index) =>{
            row.push(input.value);
            
            if (((index + 1) % 4) == 0){
                userBoard.push(row);
                row = [];
            }
        } 
        )
        solve(userBoard)
    }
    else{
        alert("Please double check instructions!")
    }

}

/**Returns if a character c is an english letter */
function isLetter(c) {
    return /^[a-zA-Z]$/.test(c)
}

/**
 * Creates a custom board using board input by user & solves; calls save()
 */
function solve(board){
    gameBoardInstance = new GameBoard()
    gameBoardInstance.createCustomBoard(board);
    gameBoardInstance.parseEnglishDict();
    setTimeout(save, 300);
}

/**
 * Saves gameBoardData to local storage and redirects to solver-endpage.html
 */
function save(){
    localStorage.setItem('gameBoardData', JSON.stringify(gameBoardInstance.toJSON()));
    location.href = 'solver-endpage.html';
}
