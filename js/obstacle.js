class Obstacle extends SpaceObject {
  constructor(gameScreen, obstacle) {
    super(gameScreen, obstacle);
    this.sustain = obstacle.sustain;
    if (this.type === "creature") {
      this.direction = Math.floor(Math.random() * 5);
      if (Math.random() < 0.5) {
        this.left = -this.width;
      } else {
        this.left = this.gameScreen.clientWidth;
        this.direction = -this.direction;
      }
      this.top = Math.floor(Math.random() * (this.gameScreen.clientHeight / 2));
    }
    else {
      this.direction = 0;
      this.top = -this.height;
      this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width - 260)) + 130;
    }
    this.renderObject(this.top, this.left);
  }

  positionObstacle() {
    if (this.type === "creature") {
      this.top += 2;
      this.left += this.direction;
    } else {
      this.top += 4;
    }
    this.renderObject(this.top, this.left);
  }

  attackObstacle(bullet) {
    const obstaclRect = this.element.getBoundingClientRect();
    const bulletRect = bullet.element.getBoundingClientRect();

    return obstaclRect.left < bulletRect.right && obstaclRect.right > bulletRect.left && obstaclRect.bottom > bulletRect.top && obstaclRect.top < bulletRect.bottom;
  }
}