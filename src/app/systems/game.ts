import { Level } from '../entities/Level';
import { Player } from '../entities/Player';
import { Ui } from '../entities/Ui';
import { PlaybackRate, Speed } from '../types';
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

    this.$player.$el.setAttribute('footstep', {
      playbackRate: PlaybackRate.Default,
      volume: 1.0,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('music', {
      volume: 0.1,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('toggle', {
      playbackRate: PlaybackRate.Toggle,
      volume: 0.1,
      loop: false,
      muted: state.player.isMuted,
    });
  },
  tick(_time, timeDelta) {
    const {player} = state;
    this.$ui.setMonsterCount(player.nearMonsters.length);
    Level.update(timeDelta);
  },
  restartGame() {
    state.player.isFound = true;
    Level.stopMonsters();
    this.$player.$el.setAttribute('wasd-controls', { acceleration: 0 });
    this.$ui.setGameOverUi();
  },
});
