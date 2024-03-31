class Game {
  constructor() {
    this.introScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.scoreDisplay = document.querySelector("#score span");
    this.lifeDisplay = document.querySelector("#life");
    this.endScore = document.querySelector("#game-end span");
    this.endMessage = document.querySelector("#game-end p");

    this.inputField = document.querySelector("#start-form input");
    this.playerName = this.inputField.value;
    this.highScoreList = document.querySelector(".high-score-list");
    this.highScore = JSON.parse(localStorage.getItem("highScore")) ?? [];
    this.volume = Number(localStorage.getItem("volume"));

    this.player;  // Player
    this.obstacles = [];  // Obstacles
    this.bullets = [];  // Bullets
    this.powers = []; // Power

    this.score = 0; // Game score
    this.life = 3; // Player lifes
    this.gameIsOver = false;  // Game status

    this.gameIntervalId;    // stores interval id
    this.gameLoopFrequency = Math.round(1000 / 60); // update 60 frames per second

    this.currentBulletFrame = 0; // Keep track of bullat frames
    this.currentObstacleFrame = 0;  // Keep track of obstacle frames
    this.currentPowerFrame = 0; // Keep track of power card

    this.bulletSpeed = 20;
    this.bulletSpeedFlag = false;
    this.bulletSpeedTimeLimit = 360;
    this.boosterCount = 1;
    this.boosterCountFlag = false;
    this.boosterCountTimeLimit = 360;
    this.flickerPlayer = false;
    this.flickerPlayerTime = 100;
    this.playerSpeedTimeInterval = 60 * 60;
    this.obstaclesFrequency = 50;

    this.explosionAudio = new Audio('./audio/explosion-audio.mp3');
    this.collisionAudio = new Audio('./audio/respawn-audio.mp3');
    this.bulletAudio = new Audio('./audio/bullet-audio.mp3');
    this.powerUpAudio = new Audio('./audio/power-up-audio.mp3');
    this.gameOverAudio = new Audio('./audio/game-over-audio.mp3');

    this.obstacleCollection = [
      {
        path: "./images/space-creature1.gif",
        height: 80,
        width: 100,
        sustain: 3,
        type: "creature"
      },
      {
        path: "./images/space-creature2.gif",
        height: 100,
        width: 100,
        sustain: 3,
        type: "creature"
      },
      {
        path: "./images/rock1.png",
        height: 80,
        width: 80,
        sustain: 2,
        type: "asteroid"
      },
      {
        path: "./images/enemy-warship1.gif",
        height: 80,
        width: 60,
        sustain: 4,
        type: "enemy"
      },
      {
        path: "./images/enemy-warship2.png",
        height: 60,
        width: 100,
        sustain: 4,
        type: "enemy"
      },
      {
        path: "./images/enemy-warship3.png",
        height: 70,
        width: 90,
        sustain: 4,
        type: "enemy"
      }
    ]
    this.powerCardCollection = [
      {
        path: "./images/coin.gif",
        behaviour: "bulletPower",
        type: "card",
        height: 50,
        width: 50
      },
      {
        path: "./images/diamond.gif",
        behaviour: "shipPower",
        type: "card",
        height: 50,
        width: 60
      },
      {
        path: "./images/card.gif",
        behaviour: "boosterPower",
        type: "card",
        height: 65,
        width: 50
      }
    ];
  }

  startGame() {
    this.introScreen.style.display = "none";  // Hide the start screen
    this.gameScreen.style.display = "flex";   // Show the game screen

    // Show default score and lifes
    this.scoreDisplay.innerText = 0;
    for (let index = 0; index < this.life; index++) {
      const element = document.createElement("img");
      element.src = "./images/life.png";
      element.style.width = "30px";
      element.style.height = "30px";
      element.style.padding = "5px";
      this.lifeDisplay.appendChild(element);
    }

    this.player = new Player(this.gameScreen);  // Initialize player
    this.animateGame();
  }

  restartGame() {
    this.endScreen.style.display = "none";    // Hide the game end screen
    this.introScreen.style.display = "flex";    // Show the game start screen
  }

  renderBullets() {
    this.currentBulletFrame += 1;
    this.bullets = this.bullets.filter(bullet => !bullet.remove);    // Remove bullets which are reached out of the screen

    // Render and remove bullets from the screen
    this.bullets.forEach(currentBullet => {
      if (currentBullet.top <= 0) {
        currentBullet.remove = true;
        currentBullet.element.remove();
      } else
        currentBullet.renderBullet();
    });

    // Create new bullet after every bulletSpeed frames
    if (this.currentBulletFrame % this.bulletSpeed === 0) {
      if (this.volume) this.bulletAudio.play();
      // Activate ship's center booster
      if (this.boosterCount === 1 || this.boosterCount === 3)
        this.bullets.push(new PlayerBullet(this.gameScreen, this.player, "center"));
      // Activate ship's right & left booster
      if (this.boosterCount === 2 || this.boosterCount === 3) {
        this.bullets.push(new PlayerBullet(this.gameScreen, this.player, "left"));
        this.bullets.push(new PlayerBullet(this.gameScreen, this.player, "right"));
      }
    }

    if (this.bulletSpeedFlag) this.bulletSpeedTimeLimit -= 1;
    // Reset bullet speed
    if (!this.bulletSpeedTimeLimit) {
      this.bulletSpeedFlag = false;
      this.bulletSpeed = 20;
      this.bulletSpeedTimeLimit = 300;
    }

    if (this.boosterCountFlag) this.boosterCountTimeLimit -= 1;
    // Reset booster count
    if (!this.boosterCountTimeLimit) {
      this.boosterCountFlag = false;
      this.boosterCount = 1;
      this.boosterCountTimeLimit = 300;
    }
  }

  renderObstacles() {
    this.currentObstacleFrame += 1;
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.remove);   // Remove obstacles which are reached out of the screen

    // Render and Remove obstacle from the screen
    this.obstacles.forEach(currentObstacle => {
      if (currentObstacle.top >= this.gameScreen.clientHeight || currentObstacle.left < -currentObstacle.width || currentObstacle.left > this.gameScreen.clientWidth) {
        currentObstacle.remove = true;
        currentObstacle.element.remove();
      } else {
        currentObstacle.moveObstacle();

        // Check bullet hit to obstacle
        this.bullets.forEach(currentBullet => {
          if (currentBullet.top <= (currentObstacle.top + currentObstacle.height) && (currentBullet.top + currentBullet.height) > currentObstacle.top) {
            if (currentObstacle.type !== "enemyBullet" && currentObstacle.attackObstacle(currentBullet)) {
              currentBullet.element.remove();
              currentObstacle.sustain -= 1;
              if (currentObstacle.sustain === 0) {
                currentObstacle.element.src = './images/blast.gif';
                this.explosionAudio.play();
                setTimeout(() => {
                  currentObstacle.element.remove();
                }, 600);
                this.score += 1;
                this.scoreDisplay.innerText = this.score;
                currentObstacle.remove = true;
              }
            }
          }
        });
      }

      if (currentObstacle.type === "enemy") {
        if (currentObstacle.bulletCount && currentObstacle.shootTime === 120) {
          this.obstacles.push(new EnemyBullet(this.gameScreen, currentObstacle));
          currentObstacle.shootTime -= 1;
        } else if (currentObstacle.shootTime === 0) {
          currentObstacle.shootTime = 120;
          currentObstacle.bulletCount -= 1;
        } else
          currentObstacle.shootTime -= 1;
      }

      // Check for obstacle collision with ship
      if (this.player.didCollide(currentObstacle)) {
        const lifeToRemove = this.lifeDisplay.querySelector(`img:nth-child(${this.life})`)
        lifeToRemove.remove();
        this.player.element.src = "./images/collide-ship.png";
        this.flickerPlayer = true;
        currentObstacle.element.remove();
        this.life -= 1;
        if (this.life === 0) {
          this.gameIsOver = true;
          this.gameOverAudio.play();
        } else {
          this.collisionAudio.play();
        }
      }
    });

    if (this.flickerPlayer) {
      this.flickerPlayerTime -= 1;
      this.player.element.style.opacity = this.player.element.style.opacity === "0" ? "1" : "0";
    }

    if (this.flickerPlayerTime === 0) {
      this.flickerPlayer = false;
      this.flickerPlayerTime = 100;
      this.player.element.src = "./images/ship.png";
      this.player.element.style.opacity = "1";
    }

    // Create one new obstacle after every obstaclesFrequency frames
    if (this.currentObstacleFrame % this.obstaclesFrequency === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen, this.obstacleCollection[Math.floor(Math.random() * this.obstacleCollection.length)]));
    }
  }

  renderPowerCard() {
    this.currentPowerFrame += 1;
    this.powers = this.powers.filter(power => !power.remove);  	// Remove powers which are reached out of the screen

    // Render and Remove power card from the screen
    this.powers.forEach(currentPower => {
      if (currentPower.top >= this.gameScreen.clientHeight) {
        currentPower.remove = true;
        currentPower.element.remove();
      } else
        currentPower.movePower();

      if (currentPower.collectPower(this.player)) {
        this.powerUpAudio.play();
        currentPower.element.remove();
        switch (currentPower.behaviour) {
          case "bulletPower": { 	// Increase bullet firing speed
            this.bulletCount = 1;
            this.bulletSpeed -= 10;
            this.bulletSpeedFlag = true;
            this.bulletSpeedTimeLimit = 300;
            break;
          };
          case "shipPower": {   // Activate ship's side boosters along with center
            this.boosterCount = 3;
            this.boosterCountFlag = true;
            this.boosterCountTimeLimit = 300;
            break;
          };
          case "boosterPower": {  // Activate ship's side booster and increase bullet firing speed
            this.boosterCount = 2;
            this.boosterCountFlag = true;
            this.boosterCountTimeLimit = 300;
            this.bulletSpeed -= 10;
            this.bulletSpeedFlag = true;
            this.bulletSpeedTimeLimit = 300;
            break;
          };
          default:
            break;
        }
      }
    });

    // Create new power after every 500 frames and delete removed power from array
    if (this.currentPowerFrame % 500 === 0) {
      this.powers.push(new Power(this.gameScreen, this.powerCardCollection[Math.floor(Math.random() * this.powerCardCollection.length)]));
    }
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
    localStorage.setItem("highScore", JSON.stringify(scoreList));   // Update high score list in local storage
    this.endMessage.innerText = this.score && scoreList[0].score <= this.score ? "Congratulations! You set new high score" : "Better luck next time";
  }

  endGame() {
    this.player.element.remove();   // Remove player from the screen
    this.obstacles.forEach(currentObstacale => currentObstacale.element.remove());    // Remove obstacles from the screen
    this.bullets.forEach(currentBullet => currentBullet.element.remove());    // Remove bulletes from the screen
    this.powers.forEach(currentPower => currentPower.element.remove());    // Remove power cards from the screen
    this.lifeDisplay.innerHTML = "";

    // Change display
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "flex";
    this.endScore.innerText = this.score;

    clearInterval(this.gameIntervalId);   // Clear interval
    this.handleHighScore();   // Display high score list
  }


  animateGame() {
    this.gameIntervalId = setInterval(() => {
      this.playerSpeedTimeInterval -= 1;
      if (this.playerSpeedTimeInterval === 0) {
        this.playerSpeedTimeInterval = 60 * 60;
        this.player.speed += 2;
        this.obstaclesFrequency -= 10;
      }
      this.player.renderPlayer(this.gameScreen);    //  Render player in the screen
      this.renderBullets();   //  Render Bullets
      this.renderObstacles();   //  Render Obstacles
      this.renderPowerCard();   //  Render Powercard
      if (this.gameIsOver) this.endGame();    //  While game is over
    }, this.gameLoopFrequency);
  }
}
