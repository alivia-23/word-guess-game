const express = require('express');
const app = express();
const PORT = 3000;

const word = require('./word');
const game = require('./game');
const gameWeb = require('./game-web');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  let gameId = game.startGame(word);
  res.send(gameWeb.gamePage(word, game, gameId));
});

app.post('/guessWord', express.urlencoded({ extended: false }), (req, res) => {
  const { text, gameId } = req.body;
  game.addWord({ word, text, gameId});
  res.send(gameWeb.gamePage(word, game, gameId));
});
app.post('/restart', express.urlencoded({ extended: false }), (req, res) => {
  res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
