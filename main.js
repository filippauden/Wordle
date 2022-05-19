var height = 6 ; //number of gusses 
var width = 5; //Lenght of the word

var row = 0; //current guess
var col = 0; //current letter for that attempt 

var gameOver = false;

//Lista med ord
const words = ["CRANE", "APPLE", "HELLO", "FRUIT"]

//Slumpa fram siffra mellan 0-words.length
let x = Math.floor(Math.random() * words.length);

//Ett slumpmässigt ord från listan
var word = words[x];

//När websidan startar sker denna funktion
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
            //Lägger till tile i klassen tile
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //listen for key press
    //(e) == (event)
    document.addEventListener("keyup", (e) => {
        if(gameOver == true) return;

        //e.code innehåller värdet av den tangeten du trycker på tex KeyA
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if(col < width){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText == ""){
                    //e.code skriver ut KeyA tex därför användes index[3] för att få endast bokstaven dvs A 
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

        if(gameOver == false && row == height){
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

        //IS it in the correct posistion 
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
            document.getElementById("answer").innerHTML = "Yay you guessed the right word";
            
        }
    }
}
