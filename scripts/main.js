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

    userInstance = new User()

    initEventListeners(gameBoardInstance, userInstance)

    countdown(1, 21)
}

function endGame() {
    console.log("ending game");
    location.href = 'endpage.html'

    //logic to populate ending page here?
}


window.startGame = startGame
window.endGame = endGame