import { GameBoard } from './GameBoard.js';
import { initEventListeners } from './processInput.js';
import { User } from './user.js'


let gameBoardInstance;
let userInstance;


//**Rename populateBoard to start game?*/
//**Add an end game function: called when the timer runs out. will redirect to a ending page with summary stats */

function populateBoard() {
    gameBoardInstance = new GameBoard();
    gameBoardInstance.createBoard();
    gameBoardInstance.parseEnglishDict();
    gameBoardInstance.consoleSolutions();

    userInstance = new User()

    initEventListeners(gameBoardInstance, userInstance)
}
window.populateBoard = populateBoard