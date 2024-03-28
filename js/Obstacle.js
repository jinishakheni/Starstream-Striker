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
    } else {
      if (this.type === "enemy") {
        this.bulletCount = Math.floor(Math.random() * 3);
        this.shootTime = this.bulletCount > 0 ? 60 : 0;
      }
      this.top = -this.height;
      this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width - 260)) + 130;
    }
    this.renderObject(this.top, this.left);
  }

  moveObstacle() {
    switch (this.type) {
      case "creature": {
        this.top += 2;
        this.left += this.direction;
        break;
      };
      case "asteroid": this.top += 4.2;
      case "enemy": this.top += 4;
      default: break;
    }
    this.renderObject(this.top, this.left);
  }

  attackObstacle(bullet) {
    const obstaclRect = this.element.getBoundingClientRect();
    const bulletRect = bullet.element.getBoundingClientRect();

    return obstaclRect.left < bulletRect.right && obstaclRect.right > bulletRect.left && obstaclRect.bottom > bulletRect.top && obstaclRect.top < bulletRect.bottom;
  }
}
