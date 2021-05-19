class PlayerTwp {
  constructor() {
    this.x = xPosP1; //x position
    this.y = yPosP2; //y position
    this.d = diamP1; //diameter
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
        //left bounds
        if (this.x - (this.d / 2) <= width / 2) {
          this.x = width / 2 + (this.d / 2) + 5;
        }
        //go left
        this.x -= this.speed;
        break;
      case "right":
        //right bounds
        if (this.x + (this.d / 2) >= width) {
          this.x = width - (this.d / 2) - 5;
        }
        //go right
        this.x += this.speed;
        break;
      default:
        break;

    }
  }
}
