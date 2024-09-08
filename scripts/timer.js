/**
 * Displays countdown given m minutes and s seconds
 */

export function countdown(m, s){
    if (s > 0){
        s = formatTime(s - 1);
    }
    else {
        m = formatTime(m - 1);
        s = 59;
    }

    document.getElementById('timer-data').textContent = m + ":" + s
    
    if (m > 0 || s > 0){
        setTimeout(() => countdown(m, s), 1000);
    }
    else {
        console.log('reached end of game');
        endGame();
    }  
}

/**
 * Places a 0 in front of 1 digit numbers
 */
function formatTime(i){
    if (i < 10) {
        i = "0" + i
    }
    return i
}