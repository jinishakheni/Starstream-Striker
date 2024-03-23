class Obstacle {
  constructor(gameScreen, obstacle) {
    this.gameScreen = gameScreen;
    this.width = 70;
    this.height = 70;
    this.top = -this.height;
    this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width));

    this.element = document.createElement("img");
    this.element.src = `./images/${obstacle}.png`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute"
    this.gameScreen.appendChild(this.element);
  }

  renderObstacle() {
    this.top += 4;
    this.element.style.top = `${this.top}px`;
  }
}