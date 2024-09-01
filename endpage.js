window.onload = function() {
    // Retrieve data from localStorage
    
    const gameBoardData = JSON.parse(localStorage.getItem('gameBoardData'));
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-element');
    
    for (let i = 0; i < gridItems.length; i++){

        let row = gridItems[i].getAttribute('x');
        let col = gridItems[i].getAttribute('y');

        gridItems[i].textContent = gameBoardData.board[row][col]
    }

    let solutions = "";
    for (let i = 0; i < gameBoardData.solutions.length; i++){
        solutions += i + 1 + ". "
        solutions += gameBoardData.solutions[i];
        solutions += "<br>"
    }

    document.getElementById('solutions-content').innerHTML = solutions;
  
    // Clear data from localStorage if no longer needed
    localStorage.removeItem('gameBoardData');
};
