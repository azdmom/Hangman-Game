//Create an array of possible words
var possibleWords = ["splicer", "rapture", "adam", "lighthouse", "plasmid"];
var letters = ["a", "b", "c", "d", "e", "f", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var dashArray = [];
var wrongChoice = [];
var wonGames = 0;
var chances = 10;
var lettersGuessed = document.getElementById("lettersGuessed")
var word = randomWord();
//When the player presses a key, a random index from the array is chosen.
function randomWord() {
    var chosenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    return chosenWord;
    console.log(chosenWord);
}
console.log(word);
//When the word is chosen, display the corresponding amount of blanks on screen.
function wordToArray(word) {
    // console.log(word);
    console.log(word.split(""));
    return word.split(""); //Turns the random word into an array.
}
var letterArray = wordToArray(word);
//This adds the amount of indexes in chosenWord to the HTML as underscores.
function dashes() {
    for (var i = 0; i < letterArray.length; i++) {
        dashArray.push("_");
    }
    replaceDash()

}
dashes();

function replaceDash() {
    document.getElementById("currentWord").innerHTML = dashArray.join(" ");
    if (dashArray.indexOf("_") === -1)
    dashArray = [];
}
replaceDash();

//If the player's choice is not in the array of the current word, then it subtracts from the chances variable. If there are no chances left, the player loses.
function minusChances() {
    var remainingChances = document.getElementById("chances");
    chances--
    remainingChances.innerHTML = "Chances Left: " + chances;
    if (chances === 0) {
        alert("You lose.")
    }
}
function restart() {
    letterGuess = "";
    playerGuess = [];
    word = randomWord();
    console.log(word);
    dashes();
    letterArray = wordToArray(word);
    console.log(letterArray);
    dashArray = [];
    dashes();
    
}

function winCount() {
    var wins = document.getElementById("wins");
    wonGames++
    wins.innerHTML = "Wins: " + wonGames;
    
}
//If the player types a letter, the letter is put into an array of guessed letters.
var playerGuess = []
document.onkeyup = function hangman(event) {
    console.log("testing array");
    console.log(letterArray);
    //assigns the variable letterGuess to the string of the key pressed
    var letterGuess = String.fromCharCode(event.keyCode).toLowerCase();
    if (playerGuess.indexOf(letterGuess) === -1) {
        playerGuess.push(letterGuess)
        //If one of the guessed letters is within the chosen word, replace the blanks with the correct letter.
        if (word.indexOf(letterGuess) >= 0) {
            for (var j = 0; j < letterArray.length; j++) {
                if (letterArray[j] === letterGuess) {
                    dashArray[j] = letterGuess;
                    console.log(dashArray);
                    console.log("test2");
                    console.log(letterArray);
                    if (dashArray.toString() == letterArray.toString()) {
                        winCount();
                        console.log(word);
                        console.log(letterArray);
                        restart();
                    }
                }
            }
            replaceDash()
        } else {
            wrongChoice.push(letterGuess);
            lettersGuessed.innerHTML = "Letters Guessed: " + wrongChoice;
            minusChances();
        }
    }
}



//If a letter is added to the array of incorrect letters, subtract one from the total chances. Total Chances sould be equal to the length of the chosen word.

//Repeat player inputs until the player is out of total chances, or or the word is complete. After the game is finished, the page refreshes.
