class Game {
  constructor() {
    this.introScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.scoreDisplay = document.querySelector("#score span");
    this.lifeDisplay = document.querySelector("#life span");
    this.endScore = document.querySelector("#game-end span");
    this.endMessage = document.querySelector("#game-end p");

    this.inputField = document.querySelector("#start-form input");
    this.playerName = this.inputField.value;
    this.highScoreList = document.querySelector(".high-score-list");
    this.highScore = JSON.parse(localStorage.getItem("highScore")) ?? [];

    this.obstacleCollection = [
      {
        path: "./images/space_creature1.gif",
        height: 80,
        width: 100,
        sustain: 3
      },
      {
        path: "./images/space_creature2.gif",
        height: 100,
        width: 100,
        sustain: 3
      },
      {
        path: "./images/rock1.png",
        height: 80,
        width: 80,
        sustain: 2
      },
      {
        path: "./images/enemy_warship1.gif",
        height: 80,
        width: 60,
        sustain: 4
      },
      {
        path: "./images/enemy_warship2.png",
        height: 60,
        width: 100,
        sustain: 4
      },
      {
        path: "./images/enemy_warship3.png",
        height: 70,
        width: 90,
        sustain: 4
      }
    ]
    this.powerCardCollection = ["./images/power2.png", "./images/power3.png", "./images/power4.png"];

    this.player;  // Player
    this.obstacles = [];  // Obstacles
    this.bullets = [];  // Bullets
    this.powers = []; // Power

    this.score = 0; // Game score
    this.lifes = 3; // Player lifes
    this.gameIsOver = false;  // Game status

    this.gameIntervalId;    // stores interval id
    this.gameLoopFrecuency = Math.round(1000 / 60); // update 60 frames per second

    this.currentBulletFrame = 0; // Keep track of bullat frames
    this.currentObstacleFrame = 0;  // Keep track of obstacle frames
    this.currentPowerFrame = 0; // Keeo track of power card

    this.bulletSpeed = 20;
    this.bulletSpeedFlag = false;
    this.bulletSpeedTimeLimit = 300;
  }

  startGame() {
    this.introScreen.style.display = "none";  // Hide the start screen
    this.gameScreen.style.display = "flex";   // Show the game screen

    // Show default score and lives
    this.lifeDisplay.innerText = 3;
    this.scoreDisplay.innerText = 0;

    this.player = new Player(this.gameScreen);  // Initialize player
    this.animateGame();
  }

  restartGame() {
    this.introScreen.style.display = "flex";    // Hide the start screen
    this.endScreen.style.display = "none";    // Show the game screen
  }

  renderBullets() {
    this.currentBulletFrame += 1;
    let removeBullets = false;

    // Render and Remove bullets from the screen
    this.bullets.forEach(currentBullet => {
      if (currentBullet.top <= 0) {
        currentBullet.element.remove();
        removeBullets = true;
      } else
        currentBullet.renderBullet();
    });

    // Create new bullet after every bulletSpeed frames and delete removed bullets from array 
    if (this.currentBulletFrame % this.bulletSpeed === 0) {
      this.bullets.push(new Bullet(this.gameScreen, this.player));
      if (removeBullets) this.bullets.splice(0, 1);    // Remove bullet from array after bullet element removed from the screen
    }

    if (this.bulletSpeedFlag) this.bulletSpeedTimeLimit -= 1;
    if (!this.bulletSpeedTimeLimit) {
      this.bulletSpeedFlag = false;
      this.bulletSpeed = 20;
      this.bulletSpeedTimeLimit = 300;
    }
  }

  renderObstacles() {
    let removeObstacle = false;
    this.currentObstacleFrame += 1;

    // Render and Remove obstacle from the screen
    this.obstacles.forEach(currentObstacle => {
      if (currentObstacle.top >= this.gameScreen.clientHeight) {
        removeObstacle = true;
        currentObstacle.element.remove();
      } else {
        currentObstacle.renderObject();

        // Check bullet hit to obstacle
        this.bullets.forEach(currentBullet => {
          if (currentBullet.top <= (currentObstacle.top + currentObstacle.height) && (currentBullet.top + currentBullet.height) > currentObstacle.top) {
            if (currentObstacle.attackObstacle(currentBullet)) {
              currentBullet.element.remove();
              currentObstacle.sustain -= 1;
              if (currentObstacle.sustain === 0) {
                currentObstacle.element.src = './images/blast.gif';
                setTimeout(() => {
                  currentObstacle.element.remove();
                }, 600);
                this.score += 1;
                this.scoreDisplay.innerText = this.score;
              }
            }
          }
        });
      }

      // Check for obstacle collision with ship
      if (this.player.didCollide(currentObstacle)) {
        this.lifes -= 1;
        this.player.element.src = "./images/collide-ship.png";
        setTimeout(() => {
          this.player.element.src = "./images/ship.png"
        }, 200);
        this.lifeDisplay.innerText = this.lifes;
        currentObstacle.element.remove();
        if (this.lifes === 0) this.gameIsOver = true;
      }
    });

    // Create one new obstacle after every 100 frames and delete removed obstacle from array 
    if (this.currentObstacleFrame % 50 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen, this.obstacleCollection[Math.floor(Math.random() * this.obstacleCollection.length)]));

      if (removeObstacle) this.obstacles.splice(0, 1);  // Remove obstacle from array after obstacle element removed from the screen
    }
  }

  renderPowerCard() {
    let removePower = false;
    this.currentPowerFrame += 1;

    // Render and Remove power card from the screen
    this.powers.forEach(currentPower => {
      if (currentPower.top >= this.gameScreen.clientHeight) {
        currentPower.element.remove();
        removePower = true;
      } else
        currentPower.renderObject();
      if (currentPower.collectPower(this.player)) {
        currentPower.element.remove();
        this.bulletSpeed -= 5;
        this.bulletSpeedFlag = true;
        this.bulletSpeedTimeLimit = 300;
      }
    });

    // Create new power after every 500 frames and delete removed power from array
    if (this.currentPowerFrame % 500 === 0) {
      this.powers.push(new Power(this.gameScreen, { path: this.powerCardCollection[Math.floor(Math.random() * this.powerCardCollection.length)], height: 40, width: 30 }));

      if (removePower) this.powers.splice(0, 1);  // Remove bullet from array after bullet element removed from the screen
    }
  }

  endGame() {
    this.player.element.remove();   // Remove player from the screen
    this.obstacles.forEach(currentObstacale => currentObstacale.element.remove());    // Remove obstacles from the screen
    this.bullets.forEach(currentBullet => currentBullet.element.remove());    // Remove bulletes from the screen
    this.powers.forEach(currentPower => currentPower.element.remove());    // Remove power cards from the screen

    // Change display
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "flex";
    this.endScore.innerText = this.score;

    clearInterval(this.gameIntervalId);   // Clear interval
    this.handleHighScore();   // Display high score list
  }

  handleHighScore() {
    this.highScoreList.innerText = "";    // Reset high score list on end screen

    // Create new high score list & render on the end screen
    const scoreList = [...this.highScore, { playerName: this.playerName, score: this.score }].toSorted((firstPlayer, secondPlayer) => secondPlayer.score - firstPlayer.score).splice(0, 8);
    scoreList.forEach(currentScore => {
      const liElement = document.createElement("li");
      liElement.innerText = `${currentScore.score} by ${currentScore.playerName}`;
      this.highScoreList.appendChild(liElement);
    });
    this.endMessage.innerText = this.score && scoreList[0].score <= this.score ? "Good Job" : "Better luck next time";
    localStorage.setItem("highScore", JSON.stringify(scoreList));   // Update high score list in local storage
  }

  animateGame() {
    this.gameIntervalId = setInterval(() => {
      this.player.renderPlayer(this.gameScreen);    //  Render player in the screen
      this.renderBullets();   //  Render Bullets
      this.renderObstacles();   //  Render Obstacles
      this.renderPowerCard();   //  Render Powercard
      if (this.gameIsOver) this.endGame();    //  While game is over
    }, this.gameLoopFrecuency);
  }
}