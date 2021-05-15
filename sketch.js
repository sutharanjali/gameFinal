let x = 300; //obstacle x position
let y = 0; //obstacle y position
let diam1 = 80; //obstacle diameter

let xPos2 = 300; //player x position
let yPos2 = 500; //player y position
let diam2 = 50; //player diameter

let state = 'titlePage';
let cnv;

let points = 0;
let speed = 3;

let player;
let obstacles = [];

function setup() {
  cnv = createCanvas(600, 600);
  noStroke();
  textAlign(CENTER);
  //frameRate(20);

  player = new Player();
  // obstacles.push(new Obstacle());
  obstacles.push(new Obstacle());

}

function draw() {
  switch (state) {
    case 'titlePage':
      titlePage();
      cnv.mouseClicked(titlePageMouseClicked);
      break;
    case 'levelOne':
      levelOne();
      break;
    case 'gameOver':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
      break;
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    player.direction = 'right';
  } else if (keyCode == LEFT_ARROW) {
    player.direction = 'left';
  } else if (key = ' ') {
    player.direction = 'still';
  }
}

function titlePage() {
  background(80, 70, 235);
  fill('white');
  textSize(50);
  text('Avoid the obstacles!', width / 2, 100);
  textSize(20);
  text('Use left and right arrows to move.', width / 2, 200);
  textSize(15);
  text('Click anywhere to start!', width / 2, 500);
}

function titlePageMouseClicked() {
  state = 'levelOne';
}

function levelOne() {
  background(0);

  if (random(1) <= 0.02) {
    obstacles.push(new Obstacle());
  }

  player.display();
  player.move();

  //iterate through obstacles array to display and move
  // for (let i = 0; i < obstacles.length; i++) {
  //   obstacles[i].display();
  //   obstacles[i].move();
  // }

  obstacles.forEach(function(obstacle) {
    obstacle.display();
    obstacle.move();
  });


  //check for collision
  //if collision, then gameOver
    //else if no collision, point +1 || splice coin out of array
      //iterate backwards through array
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let distToMe = dist(player.x, player.y, obstacles[i].x, obstacles[i].y); //distance between centers of obstacle and player
    let circleDist = player.r1 / 2 + obstacles[i].r2 / 2; //
    if (distToMe <= circleDist) {
      state = 'gameOver';
      obstacles.splice(i, obstacles.length);

      //check if obstacle is past player (collision avoided)
        //if obstacle y - radius (top of obstacle) > player y + radius (bottom of player) then increase points
    } else if ((obstacles[i].y - (obstacles[i].r2 / 2)) > (player.y + (player.r1 / 2))) {
      points++;
      // console.log(points);
      obstacles.splice(i, 1);
      // if(obstacles[i].y+(obstacles.r2/2) >= height+(obstacles.r2/2)) {//let obstacles exit canvas before splicing
      //   obstacles.splice(i, 1);
      // }
    }
  }
  textSize(30);
  fill('yellow');
  text(points, 50, 50);

  //increase speed every 5 points //HOW TO TEST FOR THIS WTF
  // if(points % 5){
  //   speed ++;
  // }

}

function gameOver() {
  background(200, 30, 60);
  textSize(50);
  fill('white');
  text('GAME OVER', width / 2, 100)

  textSize(15);
  text('Click anywhere to restart', width / 2, 200);
}

function gameOverMouseClicked() {
  state = 'levelOne';
  player.x = xPos2;
  player.y = yPos2;
  points = 0;
}
