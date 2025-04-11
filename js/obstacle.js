class Obstacle extends Component {
  constructor(gameScreen) {
    const width = 50;
    const height = 100;
    const left = Math.floor(Math.random() * (gameScreen.offsetWidth - width));
    const top = 0;
    const imgSrc = "./images/redCar.png";

    super(gameScreen, left, top, width, height, imgSrc);
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }
}
