class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = null;
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrecuency = 1000 / 75; // ~75fps
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.player = new Player(
      this.gameScreen,
      this.width / 2 - 25,
      this.height - 100,
      50,
      100,
      "./images/car.png"
    );

    if (this.scoreElement) this.scoreElement.textContent = this.score;
    if (this.livesElement) this.livesElement.textContent = this.lives;

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);
  }

  gameLoop() {
    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    if (Math.random() > 0.98) {
      const obstacle = new Obstacle(this.gameScreen);
      this.obstacles.push(obstacle);
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];

      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);

        this.lives--;
        if (this.livesElement) this.livesElement.textContent = this.lives;

        if (this.lives <= 0) {
          this.endGame();
        }
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);

        this.score++;
        if (this.scoreElement) this.scoreElement.textContent = this.score;
      }
    }
  }

  endGame() {
    this.gameIsOver = true;

    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.obstacles = [];

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
