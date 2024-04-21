class Cell {
  constructor(index) {
    this.flipped = false;
    this.toGet = true;
    this.symbol = icons[index % (size[0] * size[1] / 2)];
    this.gameCell = document.getElementById(`div${index}`);
    this.index = index;
  }

  clicked() {
    if (!this.toGet || this.flipped || resolvingMatch) return;
    this.flipped = true;
    this.gameCell.classList.add("flipped");
    board.addFlipped(this);
  }
}