class Obstacle extends SpaceObject {
  constructor(gameScreen, obstacle) {
    super(gameScreen, obstacle);
    this.sustain = 5;
  }

  attackObstacle(bullet) {
    const obstaclRect = this.element.getBoundingClientRect();
    const bulletRect = bullet.element.getBoundingClientRect();

    return obstaclRect.left < bulletRect.right && obstaclRect.right > bulletRect.left && obstaclRect.bottom > bulletRect.top && obstaclRect.top < bulletRect.bottom;
  }
}