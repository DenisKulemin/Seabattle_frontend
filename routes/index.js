var express = require("express");
var router = express.Router();

var { myGame } = require("./../public/javascripts/game.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  let gameField = myGame.render();
  res.render("index", { title: "Game", game: gameField });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (req.body.newGame == "true") {
    myGame.isNewGame = true;
  } else if (req.body.game == "true") {
    myGame.isGameStarts = true;
  } else if (req.body.endGame == "true") {
    myGame.isGameStarts = false;
    myGame.isNewGame = false;
  } else if (req.body.coordinate != undefined && myGame.isGameStarts == false) {
    myGame.addShipCoordinate(req.body.coordinate);
  } else if (req.body.coordinate != undefined && myGame.isGameStarts == true) {
    myGame.shoot(req.body.coordinate);
  } else if (req.body.setShip == "true") {
    myGame.setShipCoordinates();
  }
  res.render("index", { title: "Game", game: myGame.render() });
});

module.exports = router;
