class Bullet {
  constructor(gameScreen, player, position) {
    this.gameScreen = gameScreen;
    this.player = player;
    this.height = 7;
    this.width = 5;
    this.top = this.player.top + this.player.height / 2 - 10;

    // Left bullet
    if (position === 0)
      this.left = this.player.left + 5;

    // Right bullet
    if (position === 1)
      this.left = this.player.left + this.player.width - 11;

    this.element = document.createElement("img");
    this.element.src = "./images/bullet.png";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }
  renderBullet() {
    this.top -= 4;
    this.element.style.top = `${this.top}px`;
  }
};