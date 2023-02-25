var express = require("express");
var router = express.Router();

var { Game } = require("./../public/javascripts/game.js");

let myGame = new Game();

/* GET home page. */
router.get("/", function (req, res, next) {
  let gameField = myGame.renderGame();
  res.render("index", { title: "Game", game: gameField });
});

module.exports = router;
