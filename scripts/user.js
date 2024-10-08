export class User{
    
    constructor() {
        this.wordsFound = new Set();
        this.numWordsFound = 0;
        this.score = 0;
        this.scoringSystem = {
            3 : 100,
            4 : 400,
            5 : 800,
            6 : 1400,
            7 : 1800,
            8 : 2200,
            9 : 2600,
            10 : 3000,
            11 : 34000
        }
    }
    
    //returns relevant data to be converted to JSON
    toJSON(){
        return {
            wordsFound: Array.from(this.wordsFound),
            numWordsFound: this.numWordsFound,
            score: this.score
        }
    }

    //returns if the user has found a word
    wordFound(word){
        return this.wordsFound.has(word)
    }

    //adds word to wordsFound
    addWord(word){
        this.wordsFound.add(word)
    }
    

    //updates user score and modifies webpage to display stats
    updateStats(word){
        this.numWordsFound += 1;
        document.getElementById('word-count-data').textContent = this.numWordsFound;

        this.score += this.scoringSystem[word.length];
        document.getElementById('score-data').textContent = this.score;
    }

}