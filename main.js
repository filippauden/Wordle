var height = 6 ; //number of gusses 
var width = 5; //Lenght of the word

var row = 0; //current guess(attmpt #
var col = 0; //current letter for that attempt 

var gameOver = false;

const words = ["CRANE", "APPLE", "HELLO", "FRUIT", "LOSER"]
let x = Math.floor(Math.random() * words.length);

var word = words[x];


window.onload = function(){
    intialize();
}


function intialize(){
    //create the game board
    for(let r = 0; r < height; r++){
        for(let c = 0; c < width; c++){
            // <span id="0-0" class= tile></span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //listen for key press
    document.addEventListener("keyup", (e) => {
        if(gameOver == true) return;

        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if(col < width){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText == ""){
                    currTile.innerHTML = e.code[3];
                    col += 1;
                }
            }
        }
        else if(e.code == 'Backspace'){
            if(0 < col && col <= width){
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerHTML = "";
        }
        else if(e.code == "Enter"){
            update();
            row += 1;
            col = 0;
        }

        if(!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerHTML = "The right word is: " + word;
        }
    })
}


function update(){
    let correct = 0;
    var letterCorrect = false;
    for(let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct posistion 
        if(word[c] == letter){
            currTile.classList.add("correct");
            correct += 1;
            letterCorrect = true;
        }
        //is it in the word
        else if(word.includes(letter) && letterCorrect == false){
            currTile.classList.add("present");
        }
        //Not in the word
        else{
            currTile.classList.add("absent");
        }

        if(correct == width){
            gameOver = true;
            document.getElementById("answer").innerHTML = "You guessed the right word";
            
            
        }
    }
}
