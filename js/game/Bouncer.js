export class Bouncer extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    if (new.target === Bouncer) {
      throw new TypeError('Bouncer is abstract and cannot be instantiated directly.');
    }

    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1, 1);
    this.body.setAllowGravity(false);
  }

  setInitialVelocity(speedX, speedY) {
    this.body.setVelocity(speedX, speedY);
    return this;
  }
}
