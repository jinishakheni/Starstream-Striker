class EnemyBullet extends SpaceObject {
  constructor(gameScreen, obstacle) {
    super(gameScreen, { width: 15, height: 18, type: "enemyBullet", path: "./images/enemy-bullet.png" });
    this.sustain = 1;
    this.obstacle = obstacle;
    this.top = this.obstacle.top + this.obstacle.height;
    this.left = this.obstacle.left + this.obstacle.width / 2 - this.width / 2;
    this.renderObject(this.top, this.left);
  }

  moveObstacle() {
    this.top += 6;
    this.element.style.top = `${this.top}px`;
    this.renderObject(this.top, this.left);
  }
};