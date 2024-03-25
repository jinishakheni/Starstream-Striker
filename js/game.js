class Game {
  constructor() {
    this.introScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.scoreDisplay = document.querySelector("#score span");
    this.lifeDisplay = document.querySelector("#life span");
    this.endScore = document.querySelector("#game-end span")

    this.inputField = document.querySelector("#start-form input");
    this.playerName = this.inputField.value;
    this.highScoreList = document.querySelector(".high-score-list");
    this.highScore = JSON.parse(localStorage.getItem("highScore"));

    this.obstacleCollection = ["ufo", "rock", "asteroid"];
    this.player;  // Player
    this.bullets = [];  // Bullets
    this.obstacles = [];  // Obstacles

    this.score = 0; // Game score
    this.lifes = 3; // Player lifes
    this.gameIsOver = false;  // Game status

    this.gameIntervalId;    // stores interval id
    this.gameLoopFrecuency = Math.round(1000 / 60); // update 60 frames per second

    this.currentBulletFrame = 0; // Keep track of bullat frames
    this.currentObstacleFrame = 0;  // Keep track of obstacle frames
  }

  startGame() {
    // Hide the start screen
    this.introScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "Block";

    // Show default score and lives
    this.lifeDisplay.innerText = 3;
    this.scoreDisplay.innerText = 0;

    // Instantiate player
    this.player = new Player(this.gameScreen);
    this.animateGame();
  }

  restartGame() {
    // Hide the start screen
    this.introScreen.style.display = "flex";

    // Show the game screen
    this.endScreen.style.display = "none";
  }

  animateGame() {
    this.gameIntervalId = setInterval(() => {
      // Render player in the screen
      this.player.renderPlayer(this.gameScreen);

      let removeBullets = false;
      this.currentBulletFrame += 1;

      // Render and Remove bullets from the screen
      this.bullets.forEach(currentBullet => {
        if (currentBullet.top <= 0) {
          currentBullet.element.remove();
          removeBullets = true;
        } else
          currentBullet.renderBullet();
      });

      // Create two new bullets after every 5 frames and delete removed bullets from array 
      if (this.currentBulletFrame % 10 === 0) {
        this.bullets.push(new Bullet(this.gameScreen, this.player, 0));
        this.bullets.push(new Bullet(this.gameScreen, this.player, 1));

        // Remove bullet from array after bullet element removed from the screen
        if (removeBullets)
          this.bullets.splice(0, 2);
      }

      let removeObstacle = false;
      this.currentObstacleFrame += 1;

      // Render and Remove obstacle from the screen
      this.obstacles.forEach(currentObstacle => {
        if (currentObstacle.top >= this.gameScreen.clientHeight) {
          removeObstacle = true;
          currentObstacle.element.remove();
        } else {
          currentObstacle.renderObstacle();

          // Check bullate hit to obstacle
          this.bullets.forEach(currentBullet => {
            if (currentBullet.top <= (currentObstacle.top + currentObstacle.height) && (currentBullet.top + currentBullet.height) > currentObstacle.top) {
              if (currentObstacle.attackObstacle(currentBullet)) {
                currentBullet.element.remove();
                currentObstacle.sustain -= 1;
                if (currentObstacle.sustain === 0) {
                  currentObstacle.element.remove();
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
          this.lifeDisplay.innerText = this.lifes;
          currentObstacle.element.remove();
          if (this.lifes === 0) {
            this.gameIsOver = true;
          }
        }
      });

      // Create one new obstacle after every 100 frames and delete removed obstacle from array 
      if (this.currentObstacleFrame % 100 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen, this.obstacleCollection[Math.floor(Math.random() * this.obstacleCollection.length)]));

        // Remove obstacle from array after obstacle element removed from the screen
        if (removeObstacle)
          this.obstacles.splice(0, 1);
      }

      // While game is over, remove all elements from the screen and reset game interval and show end screen
      if (this.gameIsOver) {
        this.player.element.remove();
        this.obstacles.forEach(currentObstacale => {
          currentObstacale.element.remove();
        })
        this.bullets.forEach(currentBullet => {
          currentBullet.element.remove();
        });
        this.gameScreen.style.display = "none";
        this.endScreen.style.display = "flex";
        this.endScore.innerText = this.score;
        clearInterval(this.gameIntervalId);
        this.handleHighScore();
      }
    }, this.gameLoopFrecuency);
  }

  handleHighScore() {
    const highestScoreList = [...this.highScore, { playerName: this.playerName, score: this.score }].toSorted((firstPlayer, secondPlayer) => secondPlayer.score - firstPlayer.score).splice(0, 8);
    localStorage.setItem("highScore", JSON.stringify(highestScoreList));
    this.highScoreList.innerText = "";
    highestScoreList.forEach(currentScore => {
      const liElement = document.createElement("li");
      liElement.innerText = `${currentScore.score} by ${currentScore.playerName}`;
      this.highScoreList.appendChild(liElement);
    });
  }
}