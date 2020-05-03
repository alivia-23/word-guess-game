function gamePage(word, game, gameId) {
  return `
    <html>
      <head>
        <link rel="stylesheet" href="game.css">
      </head>
       <body>
            <div id="game-title">
                Guess Game
            </div>
            <div id="game-body">
              <div id="display-words">
                <div id="display-words-title">
                   Guess A Word
                </div>
                <div id="display-words-area">
                    ${gameWeb.getValidWords(word)}
                </div>
              </div>

              <div id="game-result">
                <div id="game-result-title">
                   Your Guesses
                </div>
                <div id="game-result-area">
                  ${gameWeb.getEnteredWords(game.allGames[gameId])}
                </div>
              </div>
            </div>
            <div id="user-turns-title">
              ${gameWeb.getTotalTurns(game.allGames[gameId])}
            </div>
            <br/>
            <div id="user-input-area">
               ${gameWeb.getOutgoing(gameId, game)}
            </div>
        </body>
   </html>`;
}

function getValidWords(word) {
  return `<ul id="valid-word-list">` +
    Object.values(word.validWords).map(validWord => {
      return `
        <li>
          <div id="valid-word">${validWord}</div>
        </li>
      `;
    }).join('\n') +
    `</ul>`;
}

function getTotalTurns(currentGame) {
  return `
     <div id="turns-taken">
      Turns Taken: ${currentGame.counter}
     </div>
    `
}

function getOutgoing(gameId, game) {
  let isGameOver = game.allGames[gameId].isGameOver;
  let showSubmitForm = !isGameOver ? 'display: inline' : 'display: none';
  let showRestartButton = isGameOver ? 'display: inline' : 'display: none';
  return `
     <form id="submitForm" action="/guessWord" method="POST"  style="${showSubmitForm}">
       <input type="hidden" name="gameId" value=${gameId} />
       <input type="text" id="input-word" name="text" value="" required="true" placeholder="Enter your guess word" />
       <button type="submit">SUBMIT</button>
     </form>
     <form id="restartForm" action="/restart"  method="POST">
       <button type="submit" style="${showRestartButton}">RESTART</button>
     </form>
  `
}

function getEnteredWords(word) {
  return `<ul id="turn-result-list">` +
    Object.values(word.turnResults).map(turnResult => {
      return `
        <li>
          <div id="turn-result">
            <span class="guessword">${turnResult}</span>
          </div>
        </li>
      `;
    }).join('\n') +
    `</ul>`;
}

const gameWeb = {
  gamePage,
  getOutgoing,
  getEnteredWords,
  getTotalTurns,
  getValidWords,
};

module.exports = gameWeb;
