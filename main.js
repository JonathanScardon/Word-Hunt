import { GameBoard } from './GameBoard.js';
import { initEventListeners } from './processInput.js';


let gameBoardInstance;

function populateBoard() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    gameBoardInstance.consoleSolutions();
    initEventListeners()
}
window.populateBoard = populateBoard