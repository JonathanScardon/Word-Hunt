import { GameBoard } from './game-board.js';
import { initEventListeners } from './process-input.js';
import { User } from './user.js'
import { countdown } from './timer.js'

let gameBoardInstance;
let userInstance;

/**
 * Creates and instance of GameBoard, generates a board & solves with parseEnglishDict
 * Initializes event listeners on letter tiles
 * Begins timer
 */
window.onload = function() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    userInstance = new User()
    initEventListeners(gameBoardInstance, userInstance)
    countdown(0, 2)
}

/**
 * Places gameBoardInstance and userInstance in local storage; redirects to game-endpage.html
 */
function endGame() { 
    localStorage.setItem('gameBoardData', JSON.stringify(gameBoardInstance.toJSON()));
    localStorage.setItem('userData', JSON.stringify(userInstance.toJSON()));
    location.href = 'game-endpage.html';
}

window.endGame = endGame