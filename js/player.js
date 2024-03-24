class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.height = 80;
    this.width = 60;
    this.left = this.gameScreen.clientWidth / 2 - this.width / 2;
    this.top = this.gameScreen.clientHeight - this.height - 30;
    this.speed = 5;
    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");
    this.element.src = "./images/ship.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }

  renderPlayer() {
    this.movePlayer();
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  movePlayer() {
    // Horizontal move
    if (this.left >= 0 && this.left <= this.gameScreen.clientWidth - this.width)
      this.left += this.directionX;
    if (this.left < 0)
      this.left = 0;
    if (this.left > this.gameScreen.clientWidth - this.width)
      this.left = this.gameScreen.clientWidth - this.width

    // Vertical move
    if (this.top >= 0 && this.top <= this.gameScreen.clientHeight - this.height)
      this.top += this.directionY;
    if (this.top < 0)
      this.top = 0;
    if (this.top > this.gameScreen.clientHeight - this.height)
      this.top = this.gameScreen.clientHeight - this.height
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    return (playerRect.top < obstacleRect.bottom && playerRect.bottom - (this.height / 2) > obstacleRect.top && playerRect.left + (this.width / 3) < obstacleRect.right && playerRect.right - (this.width / 3) > obstacleRect.left) || (playerRect.left < obstacleRect.right && playerRect.right > obstacleRect.left && playerRect.top + (this.height / 2) < obstacleRect.bottom && playerRect.bottom > obstacleRect.top)
  }
}