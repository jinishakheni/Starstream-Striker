class SpaceObject {
  constructor(gameScreen, spaceObject) {
    this.gameScreen = gameScreen;
    this.width = spaceObject.width;
    this.height = spaceObject.height;
    this.type = spaceObject.type;

    this.element = document.createElement("img");
    this.element.src = spaceObject.path;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute"
    this.gameScreen.appendChild(this.element);
    this.remove = false;
  }

  renderObject(top, left) {
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
  }
}