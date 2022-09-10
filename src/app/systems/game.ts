import {Level} from '../entities/Level';
import {Player} from '../entities/Player';
import {Ui} from '../entities/Ui';
import {Speed} from '../types';
import {state} from './state';

function onChangePointerLock() {
  if (!document.pointerLockElement) {
    this.$player.$el.setAttribute('wasd-controls', { acceleration: 0 });
    return;
  }
  this.$player.$el.setAttribute('wasd-controls', { acceleration: state.player.isRunning ? Speed.Run : Speed.Walk });
  this.$player.$el.setAttribute('bgm', { sequence: 'baseString', volume: 1.0, muted: state.player.isMuted, autoplay: true, loop: true, });
}

AFRAME.registerSystem('game', {
  schema: {},
  init() {
    Level.createStage(1);

    // init event
    document.addEventListener('pointerlockchange', onChangePointerLock.bind(this), false);
    document.addEventListener('find-key', () => {
      const $keyUi = document.querySelector('.keys');
      const $keyCountUi = $keyUi.querySelector('.ui_item_count');
      const increasedKeyCount = this.keyCount + 1;
      $keyCountUi.textContent = increasedKeyCount.toString();
      this.keyCount += 1;
    })

    // init player
    this.$player = new Player();
    // init UI
    this.$ui = new Ui();
    // init key count
    this.keyCount = 0;
  },
  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
  restartGame() {
    console.log('GAME OVER');

    setTimeout(()=>{
      Level.removeStage();
      Level.createStage(1);
    },5000)

    /*
    // init player
    this.$player = new Player();
    // init UI
    this.$ui = new Ui();
    */
  },
});
