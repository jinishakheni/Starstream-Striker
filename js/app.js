window.onload = function () {
  // Start script execution after window gets loaded on the browser
  const startButton = document.querySelector("#start-button");
  let game;

  startButton.addEventListener("click", () => {

    // Instantiate new game object and start game
    game = new Game();
    game.startGame();
  });

  // Key down event listener
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowDown")
      game.player.directionY = game.player.speed;
    if (event.code === "ArrowUp")
      game.player.directionY = -game.player.speed;
    if (event.code === "ArrowRight")
      game.player.directionX = game.player.speed;
    if (event.code === "ArrowLeft")
      game.player.directionX = -game.player.speed;
  })

  // Key up event listener
  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowDown")
      game.player.directionY = 0;
    if (event.code === "ArrowUp")
      game.player.directionY = 0;
    if (event.code === "ArrowRight")
      game.player.directionX = 0;
    if (event.code === "ArrowLeft")
      game.player.directionX = 0;
  })
}