import { Player } from '../entities/Player';
import { Level } from './level';

AFRAME.registerSystem('game', {
  schema: {},
  init() {
    console.log('Game Initialized');

    new Player(
      {
        camera: {},
        'wasd-controls': {},
        'look-controls': { pointerLockEnabled: true },
        position: { a: 0, y: 2.5, z: 0 },
      },
      {
        type: 'spot',
        angle: '30',
        decay: '1',
        distance: '30',
        color: '#fff',
        intensity: '0',
        position: '0 0 0',
      }
    );
    Level.createStage(1);
  },
  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
});
