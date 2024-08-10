let mouseDown = false
let selectedCells = []

/*
add event listeners to all elements on the grid & background
*/
export function initEventListeners(gameBoard, user) {

    document.querySelectorAll('.grid-element').forEach(cell => {
    cell.addEventListener('mousedown', startSelection);
    cell.addEventListener('mouseenter', selectCell);
})
    document.addEventListener('mouseup', () => endSelection(gameBoard, user))
}


/*
resets selectedCells to an array of length 0, calls selectCell
*/
function startSelection(event){
    mouseDown = true
    selectedCells = []
    selectCell(event)
}

/*
If the target cell is a valid selection, pushes it to the list of selected cells
*/
function selectCell(event){

    if (mouseDown == true){
        const cell = event.target;
        const x = cell.getAttribute('x');
        const y = cell.getAttribute('y');

        if (isValidSelection(cell, x, y)){
            cell.classList.add('selected');
            selectedCells.push({cell, x, y})
        }
    }
}

/*
when the mouse is released, the selected word is printed and the list of selected cells is reset
*/
function endSelection(gameBoard, user) {    
    mouseDown = false;

    let selectedWord = selectedCells.map(c => c.cell.textContent).join('');
    console.log('Selected word:', selectedWord);

    if (gameBoard.solutions.has(selectedWord) && selectedWord.length > 0 && !user.wordFound(selectedWord)){
        user.addWord(selectedWord);
        user.updateStats(selectedWord);
    }
    
    selectedCells = [];
    document.querySelectorAll('.grid-element.selected').forEach(cell => {
        cell.classList.remove('selected');
    });
    
}

/*
returns if a cell is a valid selection
*/
function isValidSelection(cell, x, y){
    //valid case 1: cell is the first element to be selected
    if (selectedCells.length == 0){
        return true;
    }

    const prevCell = selectedCells[selectedCells.length - 1];
    const deltX = Math.abs(prevCell.x - x);
    const deltY = Math.abs(prevCell.y - y);

    //valid case 2: cell is adjacent to the last selected cell AND cell has NOT already been selected
    if ((deltX == 0 && deltY == 1) || (deltX == 1 && deltY == 0) || (deltX == 1 && deltY == 1)){
        return !selectedCells.some(c => c.x === x && c.y === y);
    }
    return false
}


/** 

Update Word, Update Score Functions Here 

function updateStats(){
    console.log("updating stats");

    const wordCount = document.getElementbyId()
}

*/