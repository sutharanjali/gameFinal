class ObstacleP1 {
  constructor() {
    this.d = random(40, 80);
    this.x = random(width / 2 - (this.d / 2));
    this.y = 0 - this.d;
  }

  display() {
    image(holeImg, this.x, this.y, this.d, this.d);
  }

  move() {
    this.y += 3;
  }
}
