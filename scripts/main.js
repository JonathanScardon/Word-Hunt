import { GameBoard } from './GameBoard.js';
import { initEventListeners } from './processInput.js';
import { User } from './user.js'

import { countdown } from './timer.js'


let gameBoardInstance;
let userInstance;


//**Rename populateBoard to start game?*/
//**Add an end game function: called when the timer runs out. will redirect to a ending page with summary stats */

function startGame() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    gameBoardInstance.consoleSolutions();

    userInstance = new User()

    initEventListeners(gameBoardInstance, userInstance)

    countdown(0, 2)
}
window.startGame = startGame

function endGame() {
    console.log("ending game")
}

window.endGame = endGame