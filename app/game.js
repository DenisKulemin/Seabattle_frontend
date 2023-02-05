import { css, addDiv, addTable, addRow, addCell } from "./tag-helpers";

export class Game {
  constructor() {
    this.$app = document.querySelector("#app");

    this.stylesStats = {
      width: "100%",
      height: "50%",
      left: "0%",
      top: "25%",
    };
    this.stylesBattleField = {
      width: "40%",
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

    this.stylesCells = {
      width: "100%",
      height: "100%",
      "aspect-ratio": "1 / 1",
      left: "0%",
    };
  }

  renderGrid(numberOfCells, styles = {}) {
    return addDiv(
      Array(numberOfCells)
        .fill()
        .map((_) => addDiv("*", css(this.stylesCells)))
        .join(""),
      css(styles)
    );
  }

  renderBattleField() {
    return addDiv(
      `${this.renderGrid(100, this.stylesBattleFieldGrid)}`,
      css(this.stylesContainer)
    );
  }

  renderBattleFieldWithCoordinates() {
    let xCoordinateLine = this.renderGrid(10, this.horizontalCoordinateGrid);
    let battleFieldWithYCoordinateLine = `${this.renderGrid(
      10,
      this.verticalCoordinateGrid
    )}${this.renderBattleField()}`;

    return `${xCoordinateLine}${addDiv(
      `${battleFieldWithYCoordinateLine}`,
      css(this.stylesBattleFieldWithCoordinates)
    )}`;
  }

  renderGame() {
    this.$app.insertAdjacentHTML(
      "afterbegin",
      addDiv("player stats", css(this.stylesStats))
    );

    this.$app.insertAdjacentHTML(
      "afterbegin",
      addDiv(
        `<p>player</p>${this.renderBattleFieldWithCoordinates()}`,
        css(this.stylesBattleField)
      )
    );

    this.$app.insertAdjacentHTML(
      "afterbegin",
      addDiv(
        `<p>enemy</p>${this.renderBattleFieldWithCoordinates()}`,
        css(this.stylesBattleField)
      )
    );

    this.$app.insertAdjacentHTML(
      "afterbegin",
      addDiv("enemy stats", css(this.stylesStats))
    );
  }
}
