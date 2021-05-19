class PlayerOne {
  constructor() {
    this.x = xPosP1; //x position
    this.y = yPosP1; //y position
    this.d = diamP1; //diameter
    this.speed = 5;
    this.direction = "still";
  }

  display() {
    image(playerOneImg, this.x, this.y, this.d, this.d);
  }

  move() {
    switch (this.direction) {
      case "still":
        //dont move
        break;
      case "left":
        //go left
        if (this.x - (this.d / 2) <= 0) { //left bounds
          this.x = (this.d / 2) + 5;
        }

        this.x -= this.speed;
        break;
      case "right":
        //go right
        if (this.x + (this.d / 2) >= width / 2) { //right bounds
          this.x = width / 2 - (this.d / 2) - 5;
        }
        this.x += this.speed;
        break;
      default:
        break;
    }
  }
}
