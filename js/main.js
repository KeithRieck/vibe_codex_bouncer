import { MainScene } from './scenes/MainScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#020617',
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  }
};

const game = new Phaser.Game(config);

const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (error) {
    console.error('Service worker registration failed:', error);
  }
};

window.addEventListener('load', registerServiceWorker);

window.addEventListener('beforeunload', () => {
  game.destroy(true);
});
