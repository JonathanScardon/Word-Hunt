document.addEventListener('DOMContentLoaded', () => {
    const solveButton = document.querySelector('.solve-button');
    solveButton.addEventListener('click', checkSolvable);
});

function checkSolvable(){
    const inputs = document.querySelectorAll('.letter-input');
    let validInputs = true;

    inputs.forEach(input => {
        if (!isLetter(input.value)) {
            validInputs = false;
        }
    })

    if (validInputs){
        let userBoard = []
        let row = []

        inputs.forEach((input, index) =>{
            row.push(input.value);
            
            if (((index + 1) % 4) == 0){
                userBoard.push(row);
                row = [];
            }
        } 
        )
        console.log("all good!");
        console.log(userBoard);
    }
    else{
        alert("Please double check instructions!")
    }

}

function isLetter(c) {
    return /^[a-zA-Z]$/.test(c)
}