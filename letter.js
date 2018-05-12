var Displayletters = function (word, goodGuess) {

  this.superHero = word;
  this.goodGuess = goodGuess;
  this.displayText = '';


  this.winner = false;


  this.hngOutPut = function () {

    var shown = '';

    if (this.goodGuess == undefined) {
      for (var i = 0; i < this.superHero.length; i++) {
        shown += ' _ ';
      }
    }
    else {

      for (var i = 0; i < this.superHero.length; i++) {

        var letterFound = false;

        for (var j = 0; j < this.goodGuess.length; j++) {
          if (this.superHero[i] == this.goodGuess[j]) {
            shown += this.goodGuess[j];
            letterFound = true;
          }
        }

        if (!letterFound) {
          shown += ' _ ';
        }
      }
    }

    this.displayText = shown.trim();
    console.log(this.displayText);

    if (this.displayText == this.superHero) {
      this.winner = true;
    }

  }
};

module.exports = Displayletters;
