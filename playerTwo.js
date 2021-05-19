class PlayerTwo {
  constructor() {
    this.x = xPosP2;
    this.y = yPosP2;
    this.d = diamP2;
    this.speed = 5;
    this.direction = "still";
  }

  display() {
    image(playerTwoImg, this.x, this.y, this.d, this.d);
  }

  move() {
    switch (this.direction) {
      case "still":
        //dont move
        break;
      case "left":
        //go left
        if (this.x - (this.d / 2) <= width / 2) { //right bounds
          this.x = width / 2 + (this.d / 2) + 5;
        }
        this.x -= this.speed;
        break;

      case "right":
        //go right
        if (this.x + (this.d / 2) >= width) { //left bounds
          this.x = width - (this.d / 2) - 5;
        }

        this.x += this.speed;
        break;
      default:
        break;
    }
  }
}
