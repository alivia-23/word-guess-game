let allGames = {};

function selectRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function startGame(word) {
  let gameId = Math.floor(Math.random() * 100000);
  let correctWord = selectRandomWord(word.validWords);
  let turnResults = [];
  let counter = 0;
  let isGameOver = false;
  let currentGame = {
                     correctWord,
                     turnResults,
                     counter,
                     isGameOver
                   };
  allGames[gameId] = currentGame;
  console.log("Game Id:" + gameId + ", Correct word:" + currentGame.correctWord);
  return gameId;
}

function addWord({word, text, gameId}) {
  if(!text || text.trim() === "") return;
  let currentGame = game.allGames[gameId];
  if(!word.validWords.includes(text.toUpperCase())){
    currentGame.turnResults.push(text + ": " + "Invalid Word!!!");
  }
  else if(currentGame.correctWord === text.toUpperCase()){
    currentGame.turnResults.push(text + ": " + "Correct Guess! YOU WON THE GAME!!!");
    currentGame.isGameOver = true;
    currentGame.counter += 1;
  }
  else {
    currentGame.turnResults.push(text + ": " + compare(currentGame.correctWord, text) + ' letters match');
    currentGame.counter += 1;
  }
}

function compare( word, guess ) {
    let letterCountWord = {};
    let letterCountGuess = {};

    for(let letter of word.toLowerCase()) {
      letterCountWord[letter] = letterCountWord[letter] ? ++letterCountWord[letter] : 1;
    }
    for(let letter of guess.toLowerCase()) {
      letterCountGuess[letter] = letterCountGuess[letter] ? ++letterCountGuess[letter] : 1;
    }
    let matches = 0;
    for (const prop in letterCountWord) {
      if(letterCountGuess[prop]){
         let increment = letterCountGuess[prop] < letterCountWord[prop] ? letterCountGuess[prop] : letterCountWord[prop];
         matches += 1;
      }
    }

  return matches;
}

const game = {
  addWord,
  startGame,
  allGames
}

module.exports = game;
