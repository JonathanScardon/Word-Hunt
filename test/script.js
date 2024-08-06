// script.js
let selectedCells = [];
let isMouseDown = false;

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mousedown', startSelection);
    cell.addEventListener('mouseenter', selectCell);
    cell.addEventListener('mouseup', endSelection);
});

function startSelection(event) {
    isMouseDown = true;
    selectedCells = [];
    selectCell(event);
}

function selectCell(event) {
    if (isMouseDown) {
        const cell = event.target;
        const x = parseInt(cell.getAttribute('data-x'));
        const y = parseInt(cell.getAttribute('data-y'));

        if (isValidSelection(x, y)) {
            cell.classList.add('selected');
            selectedCells.push({x, y, cell});
        }
    }
}

function endSelection() {
    isMouseDown = false;
    console.log('Selected Word:', selectedCells.map(c => c.cell.textContent).join(''));
    selectedCells = [];
    document.querySelectorAll('.cell.selected').forEach(cell => {
        cell.classList.remove('selected');
    });
}

function isValidSelection(x, y) {
    if (selectedCells.length === 0) return true;

    const lastCell = selectedCells[selectedCells.length - 1];
    const dx = Math.abs(lastCell.x - x);
    const dy = Math.abs(lastCell.y - y);

    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)) {
        return !selectedCells.some(c => c.x === x && c.y === y);
    }

    return false;
}
