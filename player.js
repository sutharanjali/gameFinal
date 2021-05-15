class Player {
  constructor() {
    this.x = xPos2;
    this.y = yPos2;
    this.r1 = diam2;
    this.speed = 5;
    this.direction = "still";
  }

  display() {
    fill("white");
    noStroke();
    ellipse(this.x, this.y, this.r1);
  }

  move() {
    if (keyIsPressed) {
      if (keyCode == RIGHT_ARROW) {
        this.x += 5;
        if (this.x + (this.r1 / 2) >= width) {
          this.x = width - (this.r1/2);
        }
      } else if (keyCode == LEFT_ARROW) {
        this.x -= 5;
        if (this.x - (this.r1 / 2) <= 0) {
              this.x = 0 + (this.r1 / 2);
            }
      }
    }
    // switch (this.direction) {
    //   case "still":
    //     //dont move
    //     break;
    //   case "left":
    //     //go left
    //
    //     if (this.x - (this.r1 / 2) <= 0) {
    //       this.x = 0 + (this.r1 / 2);
    //     }
    //     this.x -= this.speed;
    //     break;
    //   case "right":
    //     //go right
    //
        // if (this.x + (this.r1 / 2) >= width) {
        //   this.x = width - (this.r1/2);
        // }
    //     this.x += this.speed;
    //     break;
    // }
  }
}
