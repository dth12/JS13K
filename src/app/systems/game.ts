import { Player } from '../entities/Player';
import { Level } from '../entities/Level';
import { Ui } from '../entities/Ui';
import playerSetting from '../settings/player.json';
import lightSetting from '../settings/light.json';

AFRAME.registerSystem('game', {
  schema: {},
  init() {
    Level.createStage(1);

    // init player
    new Player(playerSetting, lightSetting);
    // init UI
    new Ui();
  },
  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
});
