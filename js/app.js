window.onload = function () {
  // Start script execution after window gets loaded on the browser
  const startButton = document.querySelector("#start-button");
  let game;

  startButton.addEventListener("click", () => {

    // Instantiate new game object and start game
    game = new Game();
    game.start();
  });
}