import { Bouncer } from './Bouncer.js';

const CIRCLE_DIAMETER = 50;

export class Circle extends Bouncer {
  static diameter = CIRCLE_DIAMETER;

  constructor(scene, x, y) {
    super(scene, x, y, 'circle');

    this.setDisplaySize(CIRCLE_DIAMETER, CIRCLE_DIAMETER);
    this.setTint(Circle.randomColor());

    this.body.setCircle(CIRCLE_DIAMETER / 2);
    this.body.setDrag(0, 0);
    this.body.setMaxSpeed(260);

    const velocity = new Phaser.Math.Vector2(1, 0).rotate(Phaser.Math.FloatBetween(0, Math.PI * 2));
    const speed = Phaser.Math.Between(120, 220);

    this.setInitialVelocity(velocity.x * speed, velocity.y * speed);
  }

  static randomColor() {
    const red = Phaser.Math.Between(80, 255);
    const green = Phaser.Math.Between(80, 255);
    const blue = Phaser.Math.Between(80, 255);

    return (red << 16) | (green << 8) | blue;
  }
}
