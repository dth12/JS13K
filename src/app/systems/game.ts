import { Player } from '../entities/Player';
import { Level } from '../entities/Level';
import { Ui } from '../entities/Ui';
import playerSetting from '../settings/player.json';
import lightSetting from '../settings/light.json';
import { Speed } from '../types';
import { state } from './state';

function onChangePointerLock() {
  if (!document.pointerLockElement) {
    this.$player.$el.setAttribute('wasd-controls', { acceleration: 0 });
    return;
  }
  this.$player.$el.setAttribute('wasd-controls', { acceleration: state.player.isRunning ? Speed.Run : Speed.Walk });
}

AFRAME.registerSystem('game', {
  schema: {},
  init() {
    Level.createStage(1);

    // init event
    document.addEventListener('pointerlockchange', onChangePointerLock.bind(this), false);

    // init player
    this.$player = new Player(playerSetting, lightSetting);
    // init UI
    this.$ui = new Ui();
  },
  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
});
