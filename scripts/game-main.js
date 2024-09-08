import { GameBoard } from './game-board.js';
import { initEventListeners } from './process-input.js';
import { User } from './user.js'
import { countdown } from './timer.js'

let gameBoardInstance;
let userInstance;

window.onload = function() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    gameBoardInstance.consoleSolutions();
    userInstance = new User()
    initEventListeners(gameBoardInstance, userInstance)
    countdown(0, 3)
}

function endGame() { 
    localStorage.setItem('gameBoardData', JSON.stringify(gameBoardInstance.toJSON()));
    localStorage.setItem('userData', JSON.stringify(userInstance.toJSON()));

    console.log(gameBoardInstance.solutions)
    location.href = 'game-endpage.html';
}

window.endGame = endGame