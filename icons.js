class Icon {
  constructor(src, alt = null) {
    this.src = src;
    this.alt = alt;
  }
}

function initiateIcons() {
  for (let i = 0; i < size[0] * size[1] / 2; i++) {
    icons.push(new Icon(`images/flower-bouquet-${i}.png`));
  }
}
