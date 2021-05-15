class Obstacle {
  constructor() {
    this.r2 = random(50,110);
    this.x = random(width);
    this.y = 0 - this.r2;
  }

  display() {
    fill('red');
    noStroke();
    ellipse(this.x, this.y, this.r2);
  }

  move() {
    this.y+=3;
  }
}
