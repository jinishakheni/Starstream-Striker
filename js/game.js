class Game {
  constructor() {
    this.introScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");

    this.player;  // Player
    this.obstacles = [];  // Obstacles

    this.score = 0; // Game score
    this.lives = 3; // Player lives
    this.gameIsOver = false;  // Game status

    this.gameIntervalId;    // stores interval id
    this.gameLoopFrecuency = Math.round(1000 / 60); // update 60 frames per second
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
      this.player.renderPlayer();
    }, this.gameLoopFrecuency);
  }
}