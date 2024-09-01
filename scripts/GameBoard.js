import { Graph } from './graph.js';


export class GameBoard {
    constructor() {
      // Initialize letter frequencies as an array of objects with range and letter properties
      this.letterFrequencies = [
        { range: [0, .113], letter: 'e' },
        { range: [.113, .198], letter: 'a' },
        { range: [.198, .273], letter: 'r' },
        { range: [.273, .348], letter: 'i' },
        { range: [.348, .420], letter: 'o' },
        { range: [.420, .490], letter: 't' },
        { range: [.490, .557], letter: 'n' },
        { range: [.557, .614], letter: 's' },
        { range: [.614, .669], letter: 'l' },
        { range: [.669, .714], letter: 'c' },
        { range: [.714, .750], letter: 'u' },
        { range: [.750, .784], letter: 'd' },
        { range: [.784, .816], letter: 'p' },
        { range: [.816, .846], letter: 'm' },
        { range: [.846, .876], letter: 'h' },
        { range: [.876, .901], letter: 'g' },
        { range: [.901, .922], letter: 'b' },
        { range: [.922, .940], letter: 'f' },
        { range: [.940, .958], letter: 'y' },
        { range: [.958, .971], letter: 'w' },
        { range: [.971, .982], letter: 'k' },
        { range: [.982, .991], letter: 'v' },
        { range: [.991, .994], letter: 'x' },
        { range: [.994, .997], letter: 'z' },
        { range: [.997, .999], letter: 'j' },
        { range: [.999, 1], letter: 'q' },

      ];   
      
      this.board = [["", "", "", ""],
                    ["", "", "", ""],
                    ["", "", "", ""],
                    ["", "", "", ""]];

      this.size = 4

      this.graph = new Graph();

      this.path = [];

      this.solutions = new Set();

    }

    //returns relevant data to be converted to JSON
    toJSON() {
        return {
            board: this.board,
            solutions: Array.from(this.solutions)
          };
    }


    /*
    Iterates over grid elements and populates webpage with letters, while also populating
    this.board (will be used to create a graph representation of the game, needed for solving)
    */
    createBoard() {
        const gridContainer = document.getElementById('grid-container');
        const gridItems = gridContainer.getElementsByClassName('grid-element');

        for (let i = 0; i < gridItems.length; i++){
            let letterKey = Math.random();
            let letter = this.letterGenerator(letterKey);

            let row = gridItems[i].getAttribute('x');
            let col = gridItems[i].getAttribute('y')

            this.board[row][col] = letter;
            gridItems[i].textContent = letter;

        }
        this.constructGraphRep();
    }
 
    /*
    maps letterKey to a letter as determined by this.letterFrequencies
    */
    letterGenerator(letterKey) {
        let letter = "";

        for (const item of this.letterFrequencies) {
            if (letterKey >= item.range[0] && letterKey <= item.range[1]) {
                letter = item.letter;
                break;
            }
        }
        return letter
    }

    /*
    Constructs a graph representation of the board
    */
    constructGraphRep() {

        for (let i = 0; i < this.size; i ++) {
            for (let j = 0; j < this.size; j++) {
                let v1 = this.board[i][j] + String(this.letterCount(this.board[i][j], i, j));
                //bottom right corner do nothing
                if (i == this.size - 1 && j == this.size - 1) {
                    continue;
                }
                //bottom row, create edge to right neighbor (if exists)
                else if (i == this.size - 1 && j != this.size - 1) {
                    let v2 = this.board[i][j+1] + String(this.letterCount(this.board[i][j+1], i, j+1));
                    this.graph.addEdge(v1, v2);
                }
                //rightmost column, create edge to bottom & bottom left neighbors (if they exist)
                else if (i != this.size - 1 && j == this.size - 1) {
                    let v2 = this.board[i+1][j] + String(this.letterCount(this.board[i+1][j], i+1, j));
                    let v3 = this.board[i+1][j-1] + String(this.letterCount(this.board[i+1][j-1], i+1, j-1));
                    this.graph.addEdge(v1, v2);
                    this.graph.addEdge(v1, v3);                
                }
                //general case: create edges from bottom, right, and bottom right neighbors (bottom left if exists)
                else {
                    let v2 = this.board[i][j+1] + String(this.letterCount(this.board[i][j+1], i, j+1));
                    let v3 = this.board[i+1][j] + String(this.letterCount(this.board[i+1][j], i+1, j));
                    let v4 = this.board[i+1][j+1] + String(this.letterCount(this.board[i+1][j+1], i+1, j+1));
                    this.graph.addEdge(v1, v2);
                    this.graph.addEdge(v1, v3);
                    this.graph.addEdge(v1, v4);
                    if (j > 0) {
                        let v5 = this.board[i+1][j-1] + String(this.letterCount(this.board[i+1][j-1], i+1, j-1));
                        this.graph.addEdge(v1, v5)
                    }
                }
            }
        }

    }
        

    /*
    returns the occurence of letter on the board up to stopX and stopY
    */
    letterCount(letter, stopX, stopY) {

        let count = 1
        let exit_loops = false 

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (i == stopX && j == stopY) {
                    exit_loops = true;
                    break;
                }
                else if (this.board[i][j] == letter) {
                    count += 1;
                }
            }
            if (exit_loops) {
                break
            }
        }

        return count

    }


    /*
    reads english dictionary word by word
    finds all starting positions of the first letter of a word, then iterates through these positions to see
    if 'word' can be formed from it
    */
    parseEnglishDict() {

        let starting_letter = "a";
        let starting_positions = this.find_starting_positions(starting_letter);

        fetch('data/letters10.txt')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                lines.forEach(line => {
                    let word = line.trim();

                    //When new starting letter is reached, find new starting positions
                    if (word[0] != starting_letter) {
                        starting_letter = word[0];
                        starting_positions = this.find_starting_positions(starting_letter);
                    }

                    //iterate through starting positions to find word
                    starting_positions.forEach(position => {
                        this.path.push(position); //fixed bug: was previously pushing starting_letter (and not position which includes index)
                        this.findWord(position, word.substring(1));
                        this.path.pop();
                    }) 


                });
            })
            .catch(error => console.error('Error reading the file:', error));
    }

    /*
    recursively searches for words in the graph

    base case:
    when length of word is 0, indicates an entire word has been found
    when a word has not already been added to solutions, store the current path as a string and
    append to list of solutions (prevents repeats in solution set)

    recursive case:
    search neighbors of starting node for the first letter of the word
    if first letter is a neighbor and has NOT already been used, recursively call find_word, then pops
    otherwise returns none (?)
    */
    
    findWord(startingNode, word) {
        if (word.length == 0) {
            let currentPath = this.findCurrentPath();
            //modified for solution set (not implemented with array)
            this.solutions.add(currentPath)
            return
        }

        this.graph.getNeighbors(startingNode).forEach(neighbor => {
            if (neighbor[0] == word[0] && !this.path.includes(neighbor)) {
                this.path.push(neighbor);
                this.findWord(neighbor, word.substring(1));
                this.path.pop();     
            }
        })
    }

    /*
    returns a list of nodes representing the letter 'letter' (ex. nodes a1 and a2 both represent the letter 'a.' Numbering
    is to ensure nodes are distinct)
    */
    find_starting_positions(letter) {
        let occurrences = [];
        this.graph.getAllNodes().forEach(node => {
            if (node.charAt(0) === letter) {
                occurrences.push(node);
            }
        });
        return occurrences;
    }

    /*
    returns the current path as a string, removing occurence labels from letters
    ex. [e1, a1, t2] is returned as "eat"
    */
   findCurrentPath() {
    let path = "";
    this.path.forEach(node => {
        path += node[0];
    })
    return path
   }

   consoleSolutions() {
    console.log(this.solutions);
   }
  

}