window.onload = function () {
  // Start script execution after window gets loaded on the browser
  const startForm = document.querySelector("#start-form");
  const restartButton = document.querySelector("#restart-button");
  const volumeButton = document.querySelector("#mute-button");
  const buttonClickAudio = new Audio('./audio/button-click-audio.mp3');
  const backgroundAudio = new Audio('./audio/game-audio.mp3');
  backgroundAudio.loop = true; // Loop the audio
  backgroundAudio.pause(); // Pause the audio in starting
  localStorage.setItem("volume", 0);
  let game;

  // Submit button event listner
  startForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission, if the input field is empty
    buttonClickAudio.play();
    game = new Game();
    game.startGame();
    backgroundAudio.volume = parseFloat(0.1);
  });

  // Restart button event listner
  restartButton.addEventListener("click", () => {
    buttonClickAudio.play();
    game.restartGame();
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
  });

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
  });

  function toggleMute() {
    if (backgroundAudio.paused) {
      backgroundAudio.play();
      localStorage.setItem("volume", 1);
      volumeButton.style.backgroundImage = "url('./images/volume.png')";
    } else {
      backgroundAudio.pause();
      localStorage.setItem("volume", 0);
      volumeButton.style.backgroundImage = "url('./images/mute.png')"
    }
  }
  volumeButton.addEventListener('click', toggleMute);
}