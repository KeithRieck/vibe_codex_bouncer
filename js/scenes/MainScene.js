import { Circle } from '../game/Circle.js';

const BOUNCER_COUNT = 64;

export class MainScene extends Phaser.Scene {
  constructor() {
    super('main');
    this.circles = [];
  }

  create() {
    this.createCircleTexture();
    this.resizeWorld(this.scale.width, this.scale.height);
    this.spawnCircles();

    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this);
    });
  }

  createCircleTexture() {
    if (this.textures.exists('circle')) {
      return;
    }

    const diameter = Circle.diameter;
    const radius = diameter / 2;
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(radius, radius, radius);
    graphics.generateTexture('circle', diameter, diameter);
    graphics.destroy();
  }

  spawnCircles() {
    const padding = Circle.diameter / 2;
    const width = Math.max(this.scale.width, Circle.diameter);
    const height = Math.max(this.scale.height, Circle.diameter);

    for (let index = 0; index < BOUNCER_COUNT; index += 1) {
      const x = Phaser.Math.Between(padding, Math.max(padding, width - padding));
      const y = Phaser.Math.Between(padding, Math.max(padding, height - padding));

      this.circles.push(new Circle(this, x, y));
    }
  }

  handleResize(gameSize) {
    this.resizeWorld(gameSize.width, gameSize.height);
    this.clampCirclesIntoView(gameSize.width, gameSize.height);
  }

  resizeWorld(width, height) {
    this.cameras.main.setViewport(0, 0, width, height);
    this.cameras.main.setBackgroundColor('#020617');
    this.physics.world.setBounds(0, 0, width, height);
  }

  clampCirclesIntoView(width, height) {
    const radius = Circle.diameter / 2;

    for (const circle of this.circles) {
      circle.x = Phaser.Math.Clamp(circle.x, radius, Math.max(radius, width - radius));
      circle.y = Phaser.Math.Clamp(circle.y, radius, Math.max(radius, height - radius));
      circle.body.updateFromGameObject();
    }
  }
}
