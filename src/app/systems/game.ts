import { Level } from './level';

AFRAME.registerSystem('game', {
  schema: {},

  init() {
    console.log('Game Initialized');
    Level.createStage(1);
  },

  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
});
