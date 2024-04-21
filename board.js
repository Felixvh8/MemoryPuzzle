class Board {
  constructor(size) {
    this.width = size[0];
    this.height = size[1];

    this.cells = [];

    for (let i = 0; i < this.width * this.height; i++) {
      this.cells[i] = new Cell(i);
    }

    this.flippedCells = [];
    this.completedCells = [];
  }

  addFlipped(cell) {
    this.flippedCells.push(cell);
    document.getElementById(`icon${cell.index}`).classList.add("iconFlipped");

    // Ends the function if not enough cells have been clicked
    if (this.flippedCells.length < 2) return;
    resolvingMatch = true;

    if (this.checkMatch()) {
      this.correctChoice();
      resolvingMatch = false;
      this.unflipCells();
      return;
    }



    setTimeout(() => {
      requestAnimationFrame(() => {
        this.unflipCells();
        resolvingMatch = false;
      });
    }, cardHoldLength);
  }

  checkMatch() {
    if (this.flippedCells[0].symbol == this.flippedCells[1].symbol) {
      return true;
    }
    return false;
  };

  unflipCells() {
    for (const cell of this.flippedCells) {
      cell.flipped = false;
      cell.gameCell.classList.remove("flipped");
      document.getElementById(`icon${cell.index}`).classList.remove("iconFlipped");

    }

    this.flippedCells = [];
  }

  correctChoice() {
    for (const cell of this.flippedCells) {
      cell.toGet = false;
      this.completedCells.push(cell);
      cell.gameCell.classList.add("got");
    }
    this.flippedCells = [];

    if (this.completedCells.length == 20) {
      clearInterval(timerID);
      if (seconds < highscore) {
        highscore = seconds;
        localStorage.setItem(SAVE_KEY_SCORE, highscore);
        document.getElementById("highscore").innerHTML = `Fastest Time: ${seconds} seconds`;
      }
    }
  }
}