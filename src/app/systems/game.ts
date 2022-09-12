import { Level } from '../entities/Level';
import { Player } from '../entities/Player';
import { Ui } from '../entities/Ui';
import { PlaybackRate, Speed } from '../types';
import { state } from './state';

function onChangePointerLock() {
  if(state.player.isFound || state.game.isClear) {
    return
  }

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
      this.$ui.setKeyCount(state.uiItem.keys.count + 1);
      if(state.uiItem.keys.count === state.uiItem.keys.total) {
        Level.clear();
      }
    })

    // init player
    this.$player = new Player();
    // init UI
    this.$ui = new Ui();

    this.$player.$el.setAttribute('footstep', {
      playbackRate: PlaybackRate.Default,
      volume: 1.0,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('music', {
      playbackRate: PlaybackRate.Default,
      volume: 0.2,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('toggle', {
      playbackRate: PlaybackRate.Toggle,
      volume: 0.2,
      loop: false,
      muted: state.player.isMuted,
    });
  },
  tick(_time, timeDelta) {
    if(state.game.isClear || state.player.isFound) {
      return;
    }
    
    const {player} = state;
    const footstepConfig = this.$player.$el.getAttribute('footstep');
    const playerVelocity = this.$player.$el.components['wasd-controls'].velocity;
    const isMoving = Math.abs(playerVelocity.x || playerVelocity.y || playerVelocity.z) > 5;
    this.$player.$el.setAttribute('footstep', {
      ...footstepConfig,
      muted: player.isMuted || !isMoving,
    });
    this.$ui.setMonsterCount(player.nearMonsters.length);
    Level.update(timeDelta);
  },
  restartGame() {
    state.player.isFound = true;
    Level.stopMonsters();
    this.$player.$el.setAttribute('wasd-controls', { acceleration: 0 });
    this.$ui.setGameOverUi();
  },
  resetUi() {
    this.$ui.setKeyCount(0);
    this.$ui.setMonsterCount(0);
  },
});
