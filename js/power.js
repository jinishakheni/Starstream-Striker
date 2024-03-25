class Power extends SpaceObject {
  constructor(gameScreen, power) {
    super(gameScreen, power);
  }

  collectPower(player) {
    const powerRect = this.element.getBoundingClientRect();
    const playerRect = player.element.getBoundingClientRect();

    return playerRect.left < powerRect.right && playerRect.right > powerRect.left && playerRect.top < powerRect.bottom && playerRect.bottom > powerRect.top;
  }

}