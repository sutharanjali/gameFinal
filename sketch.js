//player One x and y position, and diameter
let xPosP1 = 600 / 4;
let yPosP1 = 500;
let diamP1 = 50;

//player Two x and y position, and diameter
let xPosP2 = 600 * 0.75;
let yPosP2 = 500;
let diamP2 = 50;

let state = "titlePage";
let cnv;

let pointsP1 = 0;
let pointsP2 = 0;
let speed = 3;

let playerOne;
let playerTwo;

let obstacleP1 = [];
let obstacleP2 = [];

let coinsP1 = [];
let coinsP2 = [];

let playerOneImg;
let playerTwoImg;
let holeImg;
let coinImg;
let blueTrackImg;
let greenTrackImg;
let titleFont;
let titleImg;
let paraFontReg;
let paraFontBold;


let playerOneHasNotLost = true;
let playerTwoHasNotLost = true;

function preload() {

  playerOneImg = loadImage("assets/player1.png");
  playerTwoImg = loadImage("assets/player2.png");
  holeImg = loadImage("assets/hole.png");
  coinImg = loadImage("assets/coin.png");
  blueTrackImg = loadImage("assets/blueTrack.png");
  greenTrackImg = loadImage("assets/greenTrack.png");
  titleFont = loadFont("assets/FasterOne-Regular.ttf");
  titleImg = loadImage("assets/titleImg.png");
  paraFontReg = loadFont("assets/Play-Regular.ttf");
  paraFontBold = loadFont("assets/Play-Bold.ttf");

}

function setup() {

  cnv = createCanvas(600, 600);
  noStroke();
  textAlign(CENTER);

  playerOne = new PlayerOne();
  playerTwo = new PlayerTwo();

  obstacleP1.push(new ObstacleP1());
  obstacleP2.push(new ObstacleP2());

  coinsP1.push(new CoinsP1());
  coinsP2.push(new CoinsP2());

  imageMode(CENTER);

}

function draw() {

  switch (state) {
    case "titlePage":
      titlePage();
      cnv.mouseClicked(titlePageMouseClicked);
      break;
    case "levelOne":
      levelOne();
      break;
    case "gameOverBoth":
      gameOverBoth();
      cnv.mouseClicked(gameOverMouseClicked);
      break;
    case "gameInfo":
      gameInfo();
      cnv.mouseClicked(gameInfoMouseClicked);
      break;
    case "gameInfoPage2":
      gameInfoPage2();
      cnv.mouseClicked(gameInfoPage2MouseClicked);
      break;
    case "gameInfoPage3":
      gameInfoPage3();
      cnv.mouseClicked(gameInfoPage3MouseClicked);
      break;

  }

}

function keyPressed() {

  //movement for player One
  if (key == "d") {
    playerOne.direction = "right";
  } else if (key == "a") {
    playerOne.direction = "left";
  }

  //movement for player Two
  if (keyCode == RIGHT_ARROW) {
    playerTwo.direction = "right";
  } else if (keyCode == LEFT_ARROW) {
    playerTwo.direction = "left";
  }
}

function keyReleased() {

  //test if more than one key is pressed at the same time to determine when to pause player movement
    //counter increases per key that is pressed
      //player will only stand still when counter = 0 (no keys pressed)

  //for player One
  let numKeys1 = 0;
  if (keyIsDown(65)) {
    numKeys1++;
  }
  if (keyIsDown(68)) {
    numKeys1++;
  }
  if (numKeys1 == 0) {
    playerOne.direction = "still";
  }

  //for player Two
  let numKeys2 = 0;
  if (keyIsDown(RIGHT_ARROW)) {
    numKeys2++;
  }
  if (keyIsDown(LEFT_ARROW)) {
    numKeys2++;
  }
  if (numKeys2 == 0) {
    playerTwo.direction = "still";
  }
}

function titlePage() {

  //display background image for title screen
  image(titleImg, width / 2, height / 2, width, height);

  //print title text
  fill(235, 114, 57);
  textSize(65);
  textFont(titleFont);
  text("The RACE Game", width / 2, 130);

  //print general game instructions
  textSize(15);
  textFont(paraFontBold);
  text("Avoid the obstacles! Collect the coins!", width / 2, 170);

  //instructions for moving player One
  textSize(25);
  textFont(paraFontBold);
  image(playerOneImg, width / 4, 250, 80, 80);
  fill(0, 148, 68);
  text("PLAYER ONE", width / 4, 320);
  textSize(15);
  textFont(paraFontReg);
  text("Use 'A' and 'D' to", width / 4, 340);
  text("move left and right", width / 4, 360);

  //instructions for moving player Two
  textSize(25);
  textFont(paraFontBold);
  fill(28, 117, 188);
  image(playerTwoImg, width * 0.75, 250, 80, 80);
  text("PLAYER TWO", width * 0.75, 320);
  textSize(15);
  textFont(paraFontReg);
  text("Use Left and Right arrows", width * 0.75, 340);
  text("to move left and right", width * 0.75, 360);

  //instructions to start game
  textSize(40);
  textFont(titleFont);
  rectMode(CENTER);
  fill(255, 255, 255, 150)
  rect(width / 2, 490, 400, 70, 30);
  fill("blue")
  text("Click to start!", width / 2, 500);

}

function titlePageMouseClicked() {
  state = "levelOne";
}

function levelOne() {

  //all functionality for player One (left side of screen)
  if (playerOneHasNotLost) {

    //display background for player One
    image(greenTrackImg, width / 4, height / 2, width / 2, height);

    //set the rate at which obstacles appear
    if (random(1) <= 0.005) {
      obstacleP1.push(new ObstacleP1());
    }

    //set the rate at which coins appear
    if (random(1) <= 0.01) {
      coinsP1.push(new CoinsP1());
    }

    //display and allow movement
    playerOne.display();
    playerOne.move();

    //display and allow movement of obstacles
    obstacleP1.forEach(function(obstacle) {
      obstacle.display();
      obstacle.move();
    });

    //display and allow movement of coins
    coinsP1.forEach(function(coin) {
      coin.display();
      coin.move();
    });

    //check for collision between player and an obstacle
      //if collision, then player One loses
        //else if no collision, point +1 and splice obstacle out of array
          //iterate backwards through array
    for (let i = obstacleP1.length - 1; i >= 0; i--) {
      //gets distance between centers of obstacle and player One
      let distToMeP1 = dist(playerOne.x, playerOne.y, obstacleP1[i].x, obstacleP1[i].y);

      //gets sum of radii
      let circleDistP1 = playerOne.d / 2 + obstacleP1[i].d / 2;

      //if distance between obstacle and player is less than sum of radii, there is a collision and player One has lost
      if (distToMeP1 <= circleDistP1) {
        gameOverP1(); //this function holds game over instructions and overlay for player One
        obstacleP1.splice(i, obstacleP1.length); //remove all player One obstacles
        playerOneHasNotLost = false; //player One has lost

        //checks if collision is avoided
          //if y position of top of obstacle is greater than y position of bottom of player, collision was avoided, and points increase
      } else if (obstacleP1[i].y - obstacleP1[i].d / 2 > playerOne.y + playerOne.d / 2) {
        pointsP1++;
        obstacleP1.splice(i, 1);
      }
    }

    //same as obstacle collision, except for coins: if there is a collision, increase points (Player 1)
    for (let i = coinsP1.length - 1; i >= 0; i--) {
      let distToMeCoin1 = dist(playerOne.x, playerOne.y, coinsP1[i].x, coinsP1[i].y);
      let circleDistCoin1 = playerOne.d / 2 + coinsP1[i].d / 2;
      if (distToMeCoin1 <= circleDistCoin1) {
        pointsP1 += 10;
        coinsP1.splice(i, 1);
      }
    }
    //display points for player One
    textSize(30);
    fill("black");
    text(`${pointsP1} points`, width / 4, width - 40);

  }

  //all functionality for player Two (right side of screen)
  if (playerTwoHasNotLost) {

    //display background for player Two
    image(blueTrackImg, width * 0.75, height / 2, width / 2, height);

    //set the rate at which obstacles appear
    if (random(1) <= 0.01) {
      obstacleP2.push(new ObstacleP2());
    }

    //set the rate at which coins appear
    if (random(1) <= 0.005) {
      coinsP2.push(new CoinsP2());
    }

    //display and allow movement
    playerTwo.display();
    playerTwo.move();

    //display and allow movements of obstacles
    obstacleP2.forEach(function(obstacle) {
      obstacle.display();
      obstacle.move();
    });

    //display and allow movement of coins
    coinsP2.forEach(function(coin) {
      coin.display();
      coin.move();
    });

    //same as player One for checking player Two's obstacle collision
    for (let i = obstacleP2.length - 1; i >= 0; i--) {
      let distToMeP2 = dist(
        playerTwo.x,
        playerTwo.y,
        obstacleP2[i].x,
        obstacleP2[i].y
      );
      let circleDistP2 = playerTwo.d / 2 + obstacleP2[i].d / 2; //
      if (distToMeP2 <= circleDistP2) {
        gameOverP2();
        obstacleP2.splice(i, obstacleP2.length);
        playerTwoHasNotLost = false;
      } else if (
        obstacleP2[i].y - obstacleP2[i].d / 2 >
        playerTwo.y + playerTwo.d / 2
      ) {
        pointsP2++;
        obstacleP2.splice(i, 1);
      }
    }

    //same as player One for checking player Two's coin collision
    for (let i = coinsP2.length - 1; i >= 0; i--) {
      let distToMeCoin2 = dist(
        playerTwo.x,
        playerTwo.y,
        coinsP2[i].x,
        coinsP2[i].y
      );
      let circleDistCoin2 = playerTwo.d / 2 + coinsP2[i].d / 2;
      if (distToMeCoin2 <= circleDistCoin2) {
        pointsP2 += 10;
        coinsP2.splice(i, 1);
      }
    }
    //display points for player Two
    textSize(30);
    fill("black");
    text(`${pointsP2} points`, width * 0.75, width - 40);
  }

  //if both players have lost, end game overall and move on
  if (playerOneHasNotLost == false && playerTwoHasNotLost == false) {
    state = "gameOverBoth";
  }
}


function gameOverP1() {

  //background overlay
  noStroke();
  fill(200, 30, 60);
  rect(width / 4, height / 2, width / 2, height);

  //"You Lose" text
  textSize(50);
  fill("white");
  textFont(paraFontBold);
  text("YOU LOSE!", width / 4, 100);

  //display total points
  textSize(15);
  text(`You earned: ${pointsP1} points.`, width / 4, 200);
  playerOneHasNotLost = false;
}

function gameOverP2() {

  //background overlay
  noStroke();
  fill(200, 30, 60);
  rect(width * 0.75, height / 2, width / 2, height);

  //"You Lose" text
  textSize(50);
  fill("white");
  textFont(paraFontBold);
  text("YOU LOSE!", width * 0.75, 100);

  //display total points
  textSize(15);
  text(`You earned: ${pointsP2} points.`, width * 0.75, 200);
  playerTwoHasNotLost = false;
}

function gameOverBoth() {
  //fills whole canvas since both players lost and game is over for both
  background(255, 190, 0);

  textSize(60);
  fill("black");
  textFont(titleFont);
  text("GAME OVER!", width / 2, 150);

  //display each player's total points
  textSize(20);
  textFont(paraFontBold);
  text(`Player One earned ${pointsP1} points.`, width / 2, 260);
  text(`Player Two earned ${pointsP2} points.`, width / 2, 300);

  textSize(15);
  textFont(paraFontReg);
  text("Click to continue.", width / 2, 400);

}

function gameOverMouseClicked() {
  //reset player One position and points
  playerOne.x = xPosP1;
  playerOne.y = yPosP1;
  pointsP1 = 0;

  //reset player Two position and points
  playerTwo.x = xPosP2;
  playerTwo.y = yPosP2;
  pointsP2 = 0;

  //remove all obstacles
  obstacleP1.splice(0);
  obstacleP2.splice(0);

  //remove all coins
  coinsP1.splice(0);
  coinsP2.splice(0);

  //reset win status for both players
  playerOneHasNotLost = true;
  playerTwoHasNotLost = true;

  //move on to first page of information when clicked
  state = "gameInfo";
}

function gameInfo() {
  background(255, 140, 115);

  //text to be displayed
  let s = `
You may have noticed that, in general,
Player One seemed to win the game
much more easily than Player Two.
More obstacles and less coins means Player Two
is at a disadvantage right from the start.`

  //print text
  textSize(20);
  textLeading(30);
  text(s, width / 2, 200, 444, 170);

  textFont(paraFontBold);
  text("Why does this game do this?", width / 2, 350);

  //click to continue to next page, or press 'r' to skip all info and restart game
  textFont(paraFontReg);
  textSize(15);
  text("Click to continue.", width / 2, 450);
  text("Press 'r' to restart game.", width / 2, 480);

  //skip to go back to the main level
  if (key == 'r') {
    state = 'levelOne';
  }
}

function gameInfoMouseClicked() {
  //moves on to second page of information
  state = 'gameInfoPage2';
}

function gameInfoPage2() {
  background(120, 150, 75);

  //text to be displayed
  let s = `
This game was created as an
analogy for racial inequality.

Just like how Player Two faced more obstacles
and less access to coins (wealth),
people of color have more obstacles and
less access to opportunities
such as wealth, education, and housing
(to name just a meager few)
to excel at the same level as white people.`

  //print text
  textSize(20);
  textLeading(30);
  text(s, width / 2, 250, 450, 350);

  //click to continue to next page, or press 'r' to skip all info and restart game
  textSize(15);
  text("Click to continue.", width / 2, 450);
  text("Press 'r' to restart game.", width / 2, 480);

  //skip to go back to the main level
  if (key == 'r') {
    state = 'levelOne';
  }
}

function gameInfoPage2MouseClicked() {
  //moves on to third(last) page of information
  state = 'gameInfoPage3';
}

function gameInfoPage3() {
  background(0);
  noStroke();

  //sets colors of buttons/rectangles
  let a1 = color(255);
  let b1 = color(255);
  let c1 = color(255);
  let d1 = color(255);
  let txt = color(0);

  //for each button, set mousee hover area in which to change color
  if (mouseY >= 180 && mouseY <= 220 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
    //first button
    a1 = color(255, 252, 55);
  }

  if (mouseY >= 240 && mouseY <= 280 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
    //second button
    b1 = color(255, 252, 55);
  }

  if (mouseY >= 300 && mouseY <= 340 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
    //third button
    c1 = color(255, 252, 55);
  }

  if (mouseY >= 360 && mouseY <= 400 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
    //fourth button
    d1 = color(255, 252, 55);
  }

  //instructions
  let s = `Here are some resources to learn more.`;
  textSize(20);
  textFont(paraFontBold);
  fill("white");
  text(s, width / 2, 250, 450, 300);

  //text for buttons
  textFont(paraFontReg);
  fill(a1);
  rect(width / 2, 200, 450, 40);
  fill(txt);
  text("Black Lives Matter", width / 2, 207);

  fill(b1);
  rect(width / 2, 260, 450, 40);
  fill(txt);
  text("America's History of Injustice and Inequality", width / 2, 267);

  fill(c1);
  rect(width / 2, 320, 450, 40);
  fill(txt);
  text("Racial Equity Tools", width / 2, 327);

  fill(d1);
  rect(width / 2, 380, 450, 40);
  fill(txt);
  text("Resources on White Privilege", width / 2, 387);

  //when clicked, return to main level
  textSize(15);
  fill("white");
  text("Click to restart game.", width / 2, 450);

  //allows link to open in new window when clicked inside rectangle area
  function mousePressed() {
    if (mouseY >= 180 && mouseY <= 220 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
      window.open("https://blacklivesmatter.com/");
    }

    if (mouseY >= 240 && mouseY <= 280 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
      window.open("https://www.washingtonpost.com/nation/2020/06/08/understanding-racism-inequality-america/");
    }

    if (mouseY >= 300 && mouseY <= 340 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
      window.open("https://www.racialequitytools.org/");
    }

    if (mouseY >= 360 && mouseY <= 400 && mouseX <= width / 2 + 225 && mouseX >= width / 2 - 225) {
      window.open("https://www.plu.edu/faculty-resources/wp-content/uploads/sites/311/2017/12/resources-on-white-privilege.pdf");
    }
  }
}

function gameInfoPage3MouseClicked() {
  //returns to main level and restarts game
  state = 'levelOne';
}
