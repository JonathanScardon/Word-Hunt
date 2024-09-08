import { GameBoard } from './GameBoard.js';
import { initEventListeners } from './processInput.js';
import { User } from './user.js'
import { countdown } from './timer.js'


let gameBoardInstance;
let userInstance;


function startGame() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    gameBoardInstance.consoleSolutions();

    console.log("within start game")
    console.log(gameBoardInstance.solutions)

    //userInstance = new User()

    //initEventListeners(gameBoardInstance, userInstance)

    //countdown(0, 5)
    endGame()
    setTimeout(endGame, 1 * 1000);
}

function endGame() {
    /*
    localStorage.setItem('gameBoardData', JSON.stringify(gameBoardInstance.toJSON()));
    localStorage.setItem('userData', JSON.stringify(userInstance.toJSON()));

    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    console.log(gameBoardData);
    */

    console.log(gameBoardInstance.solutions)


    //location.href = 'gameEndpage.html';
}


window.startGame = startGame
window.endGame = endGame