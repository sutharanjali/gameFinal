class CoinsP1 {
  constructor() {
    this.d = 35;
    this.x = random(width / 2 - (this.d / 2));
    this.y = 0 - this.d;
  }

  display() {
    image(coinImg, this.x, this.y, this.d, this.d);
  }

  move() {
    this.y++;
  }
}
