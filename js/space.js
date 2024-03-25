class SpaceObject {
  constructor(gameScreen, spaceObject) {
    this.gameScreen = gameScreen;
    this.width = spaceObject.width;
    this.height = spaceObject.height;
    this.top = -this.height;
    this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width - 260)) + 130;

    this.element = document.createElement("img");
    this.element.src = spaceObject.path;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute"
    this.gameScreen.appendChild(this.element);
  }

  renderObject() {
    this.top += 4;
    this.element.style.top = `${this.top}px`;
  }
}