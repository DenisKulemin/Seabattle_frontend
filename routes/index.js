var express = require("express");
var router = express.Router();

var { myGame, Game } = require("./../public/javascripts/game.js");

const BASE_URL = process.env.BASE_URL;

const axios = require("axios");

/* GET home page. */
// eslint-disable-next-line
router.get("/", function (req, res, next) {
  let gameField = myGame.render();
  res.render("index", { title: "Game", game: gameField });
});

// eslint-disable-next-line
router.post("/", async function (req, res, next) {
  if (req.body.newGame == "true") {
    let gameInfo = await axios
      .post(`${BASE_URL}/new-game`)
      .then(function (response) {
        return response.data;
      })
      .catch((error) => {
        myGame.currentError = error.response.data.hint;
        console.warn(error.response.data);
      });
    if (gameInfo != undefined) {
      myGame.isNewGame = true;
      myGame.setGameInfo(gameInfo);
    }
  } else if (req.body.game == "true") {
    let gameInfo = await axios
      .post(`${BASE_URL}/game-start`, {
        playerId: myGame.playerId,
        gameId: myGame.gameId,
      })
      .then(function (response) {
        return response.data;
      })
      .catch((error) => {
        myGame.currentError = error.response.data.hint;
        console.warn(error.response.data);
      });
    if (gameInfo != undefined) {
      myGame.isGameStarts = true;
      myGame.setGameInfo(gameInfo);
    }

    if (!myGame.isPlayerMove) {
      let shootInfo = await axios
        .post(`${BASE_URL}/enemy-shoot`, {
          playerId: myGame.playerId,
          gameId: myGame.gameId,
        })
        .then(function (response) {
          return response.data;
        })
        .catch((error) => {
          myGame.currentError = error.response.data.hint;
          console.warn(error.response.data);
        });
      if (shootInfo != undefined) {
        myGame.setGameInfo(shootInfo);
      }
    }
  } else if (req.body.endGame == "true") {
    await axios
      .post(`${BASE_URL}/exit`, {
        playerId: myGame.playerId,
        gameId: myGame.gameId,
      })
      .then(function (response) {
        return response.data;
      })
      .catch((error) => {
        myGame.currentError = error.response.data.hint;
        console.warn(error.response.data);
      });
    myGame = new Game();
  } else if (req.body.coordinate != undefined && myGame.isGameStarts == false) {
    myGame.addShipCoordinate(req.body.coordinate);
  } else if (req.body.coordinate != undefined && myGame.isGameStarts == true) {
    let shootInfo = await axios
      .post(`${BASE_URL}/player-shoot`, {
        playerId: myGame.playerId,
        gameId: myGame.gameId,
        coordinate: myGame.convertCoordinatesToBack([req.body.coordinate])[0],
      })
      .then(function (response) {
        return response.data;
      })
      .catch((error) => {
        myGame.currentError = error.response.data.hint;
        console.warn(error.response.data);
      });
    if (shootInfo != undefined) {
      myGame.setGameInfo(shootInfo);
    }

    while (!myGame.isPlayerMove && !myGame.isGameOver) {
      let shootInfo = await axios
        .post(`${BASE_URL}/enemy-shoot`, {
          playerId: myGame.playerId,
          gameId: myGame.gameId,
        })
        .then(function (response) {
          return response.data;
        })
        .catch((error) => {
          myGame.currentError = error.response.data.hint;
          console.warn(error.response.data);
        });
      if (shootInfo != undefined) {
        myGame.setGameInfo(shootInfo);
      }
    }
  } else if (req.body.setShip == "true") {
    let shipInfo = await axios
      .post(`${BASE_URL}/new-ship`, {
        playerId: myGame.playerId,
        gameId: myGame.gameId,
        coordinates: myGame.convertCoordinatesToBack(myGame.tmpShipCoordinates),
      })
      .then(function (response) {
        return response.data;
      })
      .catch((error) => {
        myGame.currentError = error.response.data.hint;
        console.warn(error.response.data);
      });
    if (shipInfo != undefined) {
      if (shipInfo.statusCode == undefined) {
        myGame.setShipCoordinates(shipInfo);
      } else {
        myGame.currentError = shipInfo.errorCode;
      }
    }
  }

  if (myGame.isGameOver == true) {
    myGame.currentError = `Game is over.<br><b>${myGame.winner}</b> is a winner!
    <br>Press "End game" button to quit.`;
  }
  res.render("index", { title: "Game", game: myGame.render() });
});

module.exports = router;
