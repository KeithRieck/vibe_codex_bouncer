import { Circle } from '../game/Circle.js';

const FIRST_GAME_SCENE_KEY = 'main';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.createCircleTexture();
  }

  create() {
    this.scene.start(FIRST_GAME_SCENE_KEY);
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
}
