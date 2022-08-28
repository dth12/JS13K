import { Player } from '../entities/Player';
import { Level } from './level';
import playerSetting from '../settings/player.json';
import lightSetting from '../settings/light.json';

AFRAME.registerSystem('game', {
  schema: {},
  init() {
    console.log('Game Initialized');

    // init player
    new Player(playerSetting, lightSetting);

    // init stage(level)
    Level.createStage(1);
  },
  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
});
