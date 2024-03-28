class PlayerBullet {
  constructor(gameScreen, player, position) {
    this.gameScreen = gameScreen;
    this.player = player;
    this.height = 15;
    this.width = 30;
    this.top = this.player.top + this.player.height / 2 - 10;
    if (position === "center") this.left = this.player.left + this.player.width / 2 - this.width / 2;
    if (position === "left") this.left = this.player.left;
    if (position === "right") this.left = this.player.left + this.player.width - 30;
    this.element = document.createElement("img");
    this.element.src = "./images/bullet.png";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
    this.remove = false;
  }

  renderBullet() {
    this.top -= 4;
    this.element.style.top = `${this.top}px`;
  }
};