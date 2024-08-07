import { GameBoard } from './GameBoard.js';
import { initEventListeners } from './processInput.js';


let gameBoardInstance;


//**Rename populateBoard to start game?*/
//**Add an end game function: called when the timer runs out. will redirect to a ending page with summary stats */

function populateBoard() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    gameBoardInstance.consoleSolutions();
    initEventListeners(gameBoardInstance)
}
window.populateBoard = populateBoard