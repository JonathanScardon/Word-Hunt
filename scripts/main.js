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

    countdown(0, 5)
}

function endGame() {
    localStorage.setItem('gameBoardData', JSON.stringify(gameBoardInstance.toJSON()));
    localStorage.setItem('userData', JSON.stringify(userInstance.toJSON()));
    location.href = 'endpage.html';
}


window.startGame = startGame
window.endGame = endGame