let title = [];
let titleString = "";
let maxWidth = 20;
let obstacleP = 20;
let gameOn = true;
let initialFrame = 0;
let obstacles = [];
let jumpTimer = 0;
let startedJump = true;
let gameEnd = false;
let gameStart = false;

function setup() {}

function draw() {
  if (gameStart == false) {
    document.title = "🦖Press space to start";
    if (keyIsDown(32)) {
      gameStart = true;
    }
  } else {
    if (gameEnd == false) {
      titleString = "";

      if (frameCount - initialFrame > random(50, 2000)) {
        let obstacle = new Obsctacle();
        obstacles.push(obstacle);
        initialFrame = frameCount;
      }

      if (frameCount % 10 == 0) {
        for (let i = 0; i < obstacles.length; i++) {
          obstacles[i].move();
        }
      }

      for (let i = 0; i <= 20; i++) {
        for (let j = 0; j < obstacles.length; j++) {
          title[i] = "_";
          title[obstacles[j].pos] = ",";
          if (obstacles[j].pos == 0 && !keyIsDown(32)) {
            gameEnd = true;
          }
        }
      }
      title[0] = ".";

      if (keyIsDown(32) && jumpTimer <= 30) {
        if (startedJump) {
          startJumpTime = frameCount;
          startedJump = false;
        }
        print(jumpTimer);
        jumpTimer = frameCount - startJumpTime;

        title[0] = "‧";
        for (let j = 0; j < obstacles.length; j++) {
          if (obstacles[j].pos == 0) {
            title[0] = ";";
          }
        }
      } else if (!keyIsDown(32) && startedJump == false) {
      } else if (!keyIsDown(32)) {
        jumpTimer = 0;
      } else {
        startedJump = true;
        title[0] = ".";
      }

      for (let i = 0; i < title.length; i++) {
        titleString = titleString + title[i];
      }
    } else {
      titleString = "❌😢YOU LOSE 😢 ❌";
    }
    document.title = titleString;
  }
}

class Obsctacle {
  constructor() {
    this.pos = maxWidth;
  }

  move() {
    this.pos--;
  }
}
