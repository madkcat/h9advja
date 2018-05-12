
var inquirer = require('inquirer');

var superHeroList = require('./game.js');

var checkLetter = require('./word.js');

var displayLetter = require('./letter.js');



var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var alreadyGuessed = [];
var correctGuess = [];
var hngDisplay;





var game = {

  wordBank: superHeroList,
  guessesLeft: 10,
  currentWrd: null,


  startGame: function () {
    this.guessesLeft = 10;

    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[j];

    console.log('Can you guess the correct Superhero?');

    hngDisplay = new displayLetter(this.currentWrd);
    hngDisplay.hngOutPut();
    console.log('Guesses Left: ' + game.guessesLeft);

    keepPromting();
  }

};



function keepPromting() {

  console.log('');

  if (game.guessesLeft > 0) {
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function (userInput) {

      var inputLetter = userInput.letter.toUpperCase();

      if (alphabet.indexOf(inputLetter) == -1) {

        console.log('Nope, "' + inputLetter + '" is not a letter. Try again!');
        console.log('Guesses Left: ' + game.guessesLeft);
        console.log('Letters already guessed: ' + alreadyGuessed);
        keepPromting();

      }
      else if (alphabet.indexOf(inputLetter) != -1 && alreadyGuessed.indexOf(inputLetter) != -1) {

        console.log('You already guessed "' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesLeft);
        console.log('Letters already guessed: ' + alreadyGuessed);
        keepPromting();

      }
      else {

        alreadyGuessed.push(inputLetter);
        var letterInWord = checkLetter(inputLetter, game.currentWrd);

        if (letterInWord) {

          correctGuess.push(inputLetter);
          hngDisplay = new displayLetter(game.currentWrd, correctGuess);
          hngDisplay.hngOutPut();


          if (hngDisplay.winner) {
            console.log('You win!!! Congrats!!!');
            return;
          }
          else {
            console.log('Guesses Left: ' + game.guessesLeft);
            console.log('Letters already guessed: ' + alreadyGuessed);
            keepPromting();
          }

        }
        else {
          game.guessesLeft--;

          hngDisplay.hngOutPut();
          console.log('Guesses Left: ' + game.guessesLeft);
          console.log('Letters already guessed: ' + alreadyGuessed);
          keepPromting();
        }

      }

    });

  }

  else {
    console.log('Sorry, but you lost.');
    console.log('The word was "' + game.currentWrd + '".');
  }

}

game.startGame();