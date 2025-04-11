window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    location.reload();
  });

  function startGame() {
    console.log("start game");
    const game = new Game();
    game.start();

    document.addEventListener("keydown", (event) => {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];

      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();

        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -5;
            break;
          case "ArrowUp":
            game.player.directionY = -5;
            break;
          case "ArrowRight":
            game.player.directionX = 5;
            break;
          case "ArrowDown":
            game.player.directionY = 5;
            break;
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];

      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();

        if (key === "ArrowLeft" || key === "ArrowRight") {
          game.player.directionX = 0;
        }
        if (key === "ArrowUp" || key === "ArrowDown") {
          game.player.directionY = 0;
        }
      }
    });
  }
};
