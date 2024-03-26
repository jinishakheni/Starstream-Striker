window.onload = function () {
  // Start script execution after window gets loaded on the browser
  const startForm = document.querySelector("#start-form");
  const restartButton = document.querySelector("#restart-button");
  let game;

  startForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission, if the input field is empty
    game = new Game();
    game.startGame();
  });

  restartButton.addEventListener("click", () => {
    game.restartGame();
  })

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