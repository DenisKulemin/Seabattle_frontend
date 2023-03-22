var { css, addDiv, addButton } = require("./tag-helpers");

class Game {
  constructor() {
    this.$app = "";

    this.stylesStats = {
      width: "100%",
      height: "50%",
      left: "0%",
      top: "5%",
      border: "0px",
    };
    this.stylesBattleField = {
      width: "30%",
      left: "0%",
      display: "table-cell",
      border: "0px",
      padding: "1%",
    };

    this.stylesContainer = {
      left: "0%",
      width: "90.91%",
      height: "100%",
      display: "table-cell",
      border: "0px",
    };

    this.verticalCoordinateGrid = {
      width: "100%",
      height: "100%",
      left: "0%",
      "align-items": "center",
      display: "grid",
      "grid-template-rows": "repeat(10, auto)",
      gap: "0 0",
      "border-right": "0px",
    };

    this.horizontalCoordinateGrid = {
      width: "90.91%",
      height: "100%",
      left: "9.09%",
      "align-items": "center",
      display: "grid",
      "grid-template-columns": "repeat(10, auto)",
      gap: "0 0",
      "border-bottom": "0px",
    };

    this.stylesBattleFieldGrid = {
      display: "grid",
      "grid-template-columns": "repeat(10, auto)",
      "grid-template-rows": "repeat(10, auto)",
      gap: "0 0",
      width: "100%",
      height: "100%",
      left: "0%",
      "align-items": "center",
      "border-top": "0px",
      "border-left": "0px",
    };

    this.stylesBattleFieldWithCoordinates = {
      width: "100%",
      left: "0%",
      display: "table",
      border: "0px solid orange",
    };

    this.stylesBaseCells = {
      width: "100%",
      height: "100%",
      "aspect-ratio": "1 / 1",
      left: "0%",
      "white-space": "pre",
      padding: "0%",
    };

    this.stylesEmptyCells = {
      width: "100%",
      height: "100%",
      "aspect-ratio": "1 / 1",
      left: "0%",
      "white-space": "pre",
      background: "blue",
      padding: "0%",
    };

    this.stylesShipCells = {
      width: "100%",
      height: "100%",
      "aspect-ratio": "1 / 1",
      left: "0%",
      "white-space": "pre",
      background: "grey",
      padding: "0%",
    };

    this.stylesHitCells = {
      width: "100%",
      height: "100%",
      "aspect-ratio": "1 / 1",
      left: "0%",
      "white-space": "pre",
      background: "red",
      padding: "0%",
    };

    this.stylesMissCells = {
      width: "100%",
      height: "100%",
      "aspect-ratio": "1 / 1",
      left: "0%",
      "white-space": "pre",
      background: "green",
      padding: "0%",
    };

    this.stylesCells = {
      " ": this.stylesEmptyCells,
      0: this.stylesShipCells,
      X: this.stylesHitCells,
      "*": this.stylesMissCells,
    };

    this.stylesShipNumber = {
      width: "50%",
      height: "100%",
      left: "0%",
      display: "table-cell",
      border: "0px",
      "text-align": "right",
      "white-space": "pre",
    };
    this.stylesShip = {
      left: "50%",
      width: "50%",
      height: "20%",
      display: "table-cell",
      border: "0px",
    };
    this.stylesShipLine = {
      width: "100%",
      height: "100%",
      left: "0%",
      "align-items": "center",
      display: "grid",
      "grid-template-columns": "repeat(1, auto)",
      gap: "0 0",
    };
    this.stylesShipStats = {
      left: "0%",
      width: "75%",
      height: "15%",
      "margin-top": "5%",
      display: "inline-table",
      border: "0px",
    };
    this.isNewGame = false;
    this.isGameStarts = false;
    this.isPlayerMove = false;
    this.isGameOver = false;
    this.gameId = "";
    this.playerId = "";
    this.currentError = "";
    this.playerBattleFieldCells = {};
    this.playerFleet = {};
    this.enemyBattleFieldCells = {};
    this.enemyFleet = {};
    this.tmpShipCoordinates = [];
    this.playerName = "Player";
    this.enemyName = "Enemy";
    this.winner = "";
  }

  renderCell(value, key = "", isNeedButtons = false) {
    return isNeedButtons == true
      ? addButton(
          "  ",
          "/",
          "coordinate",
          key,
          [" ", ""].includes(value) ? "" : "disabled",
          css(this.stylesCells[value] ?? this.stylesBaseCells)
        )
      : addDiv(
          `${" ".repeat(2 - value.toString().length)}${
            value in this.stylesCells ? " " : value
          }`,
          css(this.stylesCells[value] ?? this.stylesBaseCells)
        );
  }

  renderGrid(obj, isNeedButtons, styles = {}) {
    if (Array.isArray(obj)) {
      return addDiv(
        Object.values(obj)
          .map((item) => item)
          .map((value) => this.renderCell(value))
          .join(""),
        css(styles)
      );
    } else {
      return addDiv(
        Object.keys(obj)
          .map((item) => item)
          .map((key) => this.renderCell(obj[key], key, isNeedButtons))
          .join(""),
        css(styles)
      );
    }
  }

  renderBattleField(BattleFieldCells, isNeedButtons) {
    return addDiv(
      `${this.renderGrid(
        BattleFieldCells,
        isNeedButtons,
        this.stylesBattleFieldGrid
      )}`,
      css(this.stylesContainer)
    );
  }

  renderBattleFieldWithCoordinates(BattleFieldCells, isNeedButtons) {
    let xCoordinateLine = this.renderGrid(
      Array.from({ length: 10 }, (x, i) => i + 1),
      false,
      this.horizontalCoordinateGrid
    );
    let battleFieldWithYCoordinateLine = `${this.renderGrid(
      "abcdefghij".split(""),
      false,
      this.verticalCoordinateGrid
    )}${this.renderBattleField(BattleFieldCells, isNeedButtons)}`;

    return `${xCoordinateLine}${addDiv(
      `${battleFieldWithYCoordinateLine}`,
      css(this.stylesBattleFieldWithCoordinates)
    )}`;
  }

  renderShipStats(shipDict = {}) {
    this.stylesShipLine["grid-template-columns"] = "repeat(1, auto)";
    this.stylesShipNumber["width"] = "84.375%";
    let patrolBoat = `${this.renderGrid(
      Array.from({ length: 1 }, (x, i) => 0),
      false,
      this.stylesShipLine
    )}${addDiv(shipDict["patrolBoat"] ?? 4, css(this.stylesShipNumber))}`;
    this.stylesShipLine["grid-template-columns"] = "repeat(2, auto)";
    this.stylesShipNumber["width"] = "68.75%";
    let submarine = `${this.renderGrid(
      Array.from({ length: 2 }, (x, i) => 0),
      false,
      this.stylesShipLine
    )}${addDiv(shipDict["submarine"] ?? 3, css(this.stylesShipNumber))}`;
    this.stylesShipLine["grid-template-columns"] = "repeat(3, auto)";
    this.stylesShipNumber["width"] = "53.125%";
    let destroyer = `${this.renderGrid(
      Array.from({ length: 3 }, (x, i) => 0),
      false,
      this.stylesShipLine
    )}${addDiv(shipDict["destroyer"] ?? 2, css(this.stylesShipNumber))}`;
    this.stylesShipLine["grid-template-columns"] = "repeat(4, auto)";
    this.stylesShipNumber["width"] = "37.5%";
    let battleship = `${this.renderGrid(
      Array.from({ length: 4 }, (x, i) => 0),
      false,
      this.stylesShipLine
    )}${addDiv(shipDict["battleship"] ?? 1, css(this.stylesShipNumber))}`;

    return `
    ${addDiv(patrolBoat, css(this.stylesShipStats))}
    ${addDiv(submarine, css(this.stylesShipStats))}
    ${addDiv(destroyer, css(this.stylesShipStats))}
    ${addDiv(battleship, css(this.stylesShipStats))}
      `;
  }

  renderGamePage(isNeedButtons) {
    this.$app = "";
    let setShipButton =
      isNeedButtons == true
        ? addButton("Set ship", "/", "setShip", "true")
        : "";

    this.$app += addDiv(
      `${setShipButton}<p>player ships</p>${this.renderShipStats(
        this.playerFleet
      )}`,
      css(this.stylesStats)
    );

    this.$app += addDiv(
      `<p>${this.playerName}</p>${this.renderBattleFieldWithCoordinates(
        this.playerBattleFieldCells,
        isNeedButtons
      )}`,
      css(this.stylesBattleField)
    );

    this.$app += addDiv(
      `<p>${this.enemyName}</p>${this.renderBattleFieldWithCoordinates(
        this.enemyBattleFieldCells,
        !isNeedButtons
      )}`,
      css(this.stylesBattleField)
    );

    this.$app += addDiv(
      `<p>enemy ships</p>${this.renderShipStats(this.enemyFleet)}`,
      css(this.stylesStats)
    );
    return (
      addDiv(this.$app, css({ margin: "5% 0% 5% 0%" })) +
      addButton("End game", "/", "endGame", "true")
    );
  }

  renderStartPage() {
    return (
      addButton("New game", "/", "newGame", "true") +
      addDiv("", css({ margin: "5%", border: "0px" })) +
      addButton("End game", "/", "endGame", "true")
    );
  }

  renderPreparationPage() {
    return (
      addButton("Start game", "/", "game", "true") +
      this.renderGamePage(true) +
      addDiv(
        "Hint: To add ship you need to click on player's battlefield (on each sell were should be your ship). " +
          "This cell became white. If you need unset any cell that you choose, just click on it one more time " +
          "(it became blue again). When you've done with choosing cells for a ship - push 'Set ship' button. If " +
          " something with your choise wrong - you will see a hint with information, what goes wrong. Remember, you " +
          "can set 4 patrol boats (one cell), 3 submarines (2 cells), 2 destroyers (3 cells) and one battleship (4 cells)." +
          " After adding all ships - press 'Start game' button.",
        css({ margin: "5% 0% 5% 0%" })
      )
    );
  }

  render() {
    let content = `<form method="post" id="myForm"></form>`;
    if (this.currentError != "") {
      content += addDiv(this.currentError);
      this.currentError = "";
    }
    if (this.isNewGame == false) {
      return content + this.renderStartPage();
    } else if (this.isGameStarts == false) {
      return content + this.renderPreparationPage();
    } else {
      return (
        content +
        this.renderGamePage(false) +
        addDiv(
          "Hint: Enemy response takes just a moment, so you can at any time (because enemy is already made all its moves). " +
            "To shoot, choose cell on eneme battlefield and press it. It you see red cell - you hit the ship, if green - you miss. " +
            "Game is automatically updates area around hitted ships (mark sells as green in area where cannot be other ships). " +
            "When someone wins, you will see the note above with this information and the name of winner.",
          css({ margin: "5% 0% 5% 0%" })
        )
      );
    }
  }

  addShipCoordinate(coordinate) {
    console.log(this.tmpShipCoordinates.includes(coordinate));
    if (this.tmpShipCoordinates.includes(coordinate)) {
      this.tmpShipCoordinates.splice(
        this.tmpShipCoordinates.indexOf(coordinate),
        1
      );
      this.playerBattleFieldCells[coordinate] = " ";
    } else {
      this.tmpShipCoordinates.push(coordinate);
      this.playerBattleFieldCells[coordinate] = "";
    }
  }

  setShipCoordinates(shipInfo) {
    this.playerBattleFieldCells = Object.assign(
      {},
      this.playerBattleFieldCells,
      this.convertCoordinatesToFront(shipInfo["playerShipCells"])
    );
    this.playerFleet = shipInfo["playerFleet"];
    this.tmpShipCoordinates = [];
  }

  convertCoordinatesToFront(coordinates) {
    console.log(coordinates);
    let frontCoordinates = {};
    Object.values(coordinates).map(
      (item) =>
        (frontCoordinates[item.x.toString() + " " + item.y.toString()] =
          item.sign)
    );
    console.log(frontCoordinates);
    return frontCoordinates;
  }

  convertCoordinatesToBack(coordinates) {
    let backCoordinates = [];
    Object.values(coordinates).map((item) =>
      backCoordinates.push(item.split(" "))
    );

    return backCoordinates;
  }

  setGameInfo(gameInfo) {
    this.gameId = gameInfo["gameId"];
    this.playerId = gameInfo["playerId"];
    this.playerBattleFieldCells = this.convertCoordinatesToFront(
      gameInfo["playerBattleFieldCells"]
    );
    this.playerFleet = gameInfo["playerFleet"];
    this.enemyBattleFieldCells = this.convertCoordinatesToFront(
      gameInfo["enemyBattleFieldCells"]
    );
    this.enemyFleet = gameInfo["enemyFleet"];
    this.isPlayerMove = gameInfo["isPlayerMove"];
    this.isGameOver = gameInfo["isGameOver"];
    if (this.isGameOver == true) {
      this.winner = gameInfo["winner"];
    }
  }
}

let myGame = new Game();

module.exports = {
  myGame,
  Game,
};
