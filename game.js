var wordslist = ["New Jersey, Pennsylvania, New York, Virginia"];
var wordChosen = "";
var lettersInChosenWord = [];
var lettersChosen = "";
var wins = 0;
var losses = 0;
var numGuesses = 9;
var wrongGuesses = 0;
var numBlanks = 0;

//Create a function that will take in the keys
function startgame(){
numGuesses = 9;
wordChosen = wordslist[Math.floor(Math.random() * wordslist.length)];
lettersInChosenWord = wordChosen.split("");
numBlanks = lettersInChosenWord.length;
console.log(chosenWord);
wrongGuesses = [];

//Add to losses if user guesses wrong
blanksAndSuccesses = [];
// CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
wrongGuesses = [];

for (var i = 0; i < numBlanks; i++) {
  blanksAndSuccesses.push("_");
}

console.log(blanksAndSuccesses);

document.getElementById("guesses-left").innerHTML = numGuesses;

// Prints the blanks at the beginning of each round in the HTML
document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

// Clears the wrong guesses from the previous round
document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// checkLetters() function
// It's where we will do all of the comparisons for matches.
// Again, it's not being called here. It's just being made for future use.
function checkLetters(letter) {

// This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
var letterInWord = false;

// Check if a letter exists inside the array at all.
for (var i = 0; i < numBlanks; i++) {
  if (wordChosen[i] === letter) {
    // If the letter exists then toggle this boolean to true. This will be used in the next step.
    letterInWord = true;
  }
}

// If the letter exists somewhere in the word, then figure out exactly where (which indices).
if (letterInWord) {

  // Loop through the word.
  for (var j = 0; j < numBlanks; j++) {

    // Populate the blanksAndSuccesses with every instance of the letter.
    if (wordChosen[j] === letter) {
      // Here we set the specific space in blanks and letter equal to the letter when there is a match.
      blanksAndSuccesses[j] = letter;
    }
  }
  // Logging for testing.
  console.log(blanksAndSuccesses);
}
// If the letter doesn't exist at all...
else {
  // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
  wrongGuesses.push(letter);
  numGuesses--;
}
}

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {

// First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

// Update the HTML to reflect the new number of guesses. Also update the correct guesses.
document.getElementById("guesses-left").innerHTML = numGuesses;
// This will print the array of guesses and blanks onto the page.
document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
// This will print the wrong guesses onto the page.
document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

// If we have gotten all the letters to match the solution...
if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
  // ..add to the win counter & give the user an alert.
  winCounter++;
  alert("You win!");

  // Update the win counter in the HTML & restart the game.
  document.getElementById("win-counter").innerHTML = winCounter;
  startGame();
}

// If we've run out of guesses..
else if (numGuesses === 0) {
  // Add to the loss counter.
  lossCounter++;
  // Give the user an alert.
  alert("You lose");

  // Update the loss counter in the HTML.
  document.getElementById("loss-counter").innerHTML = lossCounter;
  // Restart the game.
  startGame();
}

}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

// Starts the Game by running the startGame() function
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
// Check if the key pressed is a letter.
if (event.keyCode >= 65 && event.keyCode <= 90) {
  // Converts all key clicks to lowercase letters.
  var letterGuessed = event.key.toLowerCase();
  // Runs the code to check for correctness.
  checkLetters(letterGuessed);
  // Runs the code after each round is done.
  roundComplete();
}
};