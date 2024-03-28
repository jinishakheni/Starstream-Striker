class Power extends SpaceObject {
  constructor(gameScreen, power) {
    super(gameScreen, power);
    this.behaviour = power.behaviour;
    this.top = -this.height;
    this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width - 260)) + 130;
    this.renderObject(this.top, this.left);
  }

  movePower() {
    this.top += 5;
    this.renderObject(this.top, this.left);
  }

  collectPower(player) {
    const powerRect = this.element.getBoundingClientRect();
    const playerRect = player.element.getBoundingClientRect();

    return playerRect.left < powerRect.right && playerRect.right > powerRect.left && playerRect.top < powerRect.bottom && playerRect.bottom > powerRect.top;
  }

}
