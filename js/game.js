class Game {
  constructor() {
    this.introScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");

    this.player;  // Player
    this.bullets = [];  // Bullets
    this.obstacles = [];  // Obstacles

    this.score = 0; // Game score
    this.lives = 3; // Player lives
    this.gameIsOver = false;  // Game status

    this.gameIntervalId;    // stores interval id
    this.gameLoopFrecuency = Math.round(1000 / 60); // update 60 frames per second

    this.currentBulletFrame = 0; // Keep track of bullat frames
  }

  startGame() {
    this.introScreen.style.display = "none";
    this.gameScreen.style.display = "Block";

    // Instantiate player
    this.player = new Player(this.gameScreen);

    this.animateGame();
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
        }
        currentBullet.renderBullet();
      });

      // Create two new bullets after every 5 frames and delete removed bullets from array 
      if (this.currentBulletFrame % 5 === 0) {
        this.bullets.push(new Bullet(this.gameScreen, this.player, 0));
        this.bullets.push(new Bullet(this.gameScreen, this.player, 1));

        // Remove bullet from array after bullet element removed from the screen
        if (removeBullets)
          this.bullets.splice(0, 2);
      }

    }, this.gameLoopFrecuency);
  }
}