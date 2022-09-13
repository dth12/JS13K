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
    this.$gameScene = document.querySelector('#gameScene');
    Level.createStage(1);

    // init event
    document.addEventListener('pointerlockchange', onChangePointerLock.bind(this), false);
    document.addEventListener('find-key', () => {
      // @ts-ignore
      const coin = this.$gameScene.systems['coin'];
      coin.playAudio();
      this.$player.coinCharge();
      this.$ui.setKeyCount(state.uiItem.keys.count + 1);
      if(state.uiItem.keys.count === state.uiItem.keys.total) {
        Level.clear();
      }
    })

    // init player
    this.$player = new Player();
    // init UI
    this.$ui = new Ui();

    this.$player.$el.setAttribute('coin', {
      sequence: 'coin',
      playbackRate: PlaybackRate.Default,
      volume: 1.0,
      loop: false,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('footstep', {
      sequence: 'footstep',
      playbackRate: PlaybackRate.Default,
      volume: 1.0,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('glitch', {
      sequence: 'glitch',
      playbackRate: PlaybackRate.Default,
      volume: 0.2,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('music', {
      sequence: 'music',
      playbackRate: PlaybackRate.Default,
      volume: 0.2,
      loop: true,
      muted: state.player.isMuted,
    });
    this.$player.$el.setAttribute('toggle', {
      sequence: 'toggle',
      playbackRate: PlaybackRate.Toggle,
      volume: 1.0,
      loop: false,
      muted: state.player.isMuted,
    });
  },
  tick(_time, timeDelta) {
    if(state.player.nearMonsters.length) {
      document.querySelector('.pulse_wrap').classList.add('pulse');
    } else {
      document.querySelector('.pulse_wrap').classList.remove('pulse');
    }
    
    if(state.game.isClear || state.player.isFound || !this.$player.$el.components['wasd-controls']) {
      return;
    }
    
    const {player} = state;
    const footstepConfig = this.$player.$el.getAttribute('footstep');
    const glitchConfig = this.$player.$el.getAttribute('glitch');
    const playerVelocity = this.$player.$el.components['wasd-controls'].velocity;
    const isMoving = Math.abs(playerVelocity.x || playerVelocity.y || playerVelocity.z) > 5;
    this.$player.$el.setAttribute('footstep', {
      ...footstepConfig,
      muted: player.isMuted || !isMoving,
    });
    this.$ui.setMonsterCount(player.nearMonsters.length);
    
    if (!player.isMuted)
    {
      this.$player.$el.setAttribute('glitch', {
        ...glitchConfig,
        volume: player.nearMonsters.length * 0.04,
      });
    }

    Level.update(timeDelta);
  },
  restartGame() {
    // @ts-ignore
    const $glitch = this.$gameScene.systems['glitch'];
    const glitchConfig = this.$player.$el.getAttribute('glitch');

    state.player.isFound = true;
    Level.stopMonsters();
    this.$player.flash.turnOn();
    this.$player.$el.setAttribute('wasd-controls', { acceleration: 0 });
    $glitch.pauseAudio();
    this.$player.$el.setAttribute('glitch', {
      ...glitchConfig,
      sequence: 'gameover',
      volume: 0.2,
      loop: false,
    });
    $glitch.playAudio();
    this.$ui.setGameOverUi();
  },
  resetUi() {
    this.$ui.setKeyCount(0);
    this.$ui.setMonsterCount(0);
  },
});
