import { Box } from '../entities/Box';

AFRAME.registerSystem('game', {
  schema: {},

  init() {
    console.log('Game Initialized');

    // Example summon a custom entity
    this.box = new Box(0, 2, -40);
  },

  tick(time, timeDelta) {
    // Your gameloop code
    (this.box as Box).update(time, timeDelta);
  },
});
