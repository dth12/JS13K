import { Level } from '../entities/Level';
import { state } from '../systems/state';
import { PlaybackRate, Speed } from '../types';
import { Flash } from './Flash';
import option from '../settings/player.json';

export class Player {
  private HEALTH_CONSUME_SPEED = 0.05;
  private HEALTH_RECOVER_SPEED = 0.02;
  private $gameScene = document.querySelector('#gameScene');
  private $mainPage = document.querySelector('.ui_main');
  private $gameOverPage = document.querySelector('.ui_game_over');
  private $el = document.createElement('a-entity');
  // @ts-ignore
  private $footstep = this.$gameScene.systems['footstep'];
  // @ts-ignore
  private $music = this.$gameScene.systems['music']
  private flash: Flash;

  constructor() {
    const playerOption = option as { [key: string]: any };

    Object.keys(playerOption).forEach((key) => {
      this.$el.setAttribute(key, playerOption[key]);
    });
    this.$el.id = 'player';
    this.flash = new Flash(this.$el);
    this.$gameScene.appendChild(this.$el);
    this.initEventHandler();
  }

  private run(config: any) {
    const $health = document.querySelector('.health');
    const {player} = state;
    this.$el.setAttribute('wasd-controls', {
      ...config,
      acceleration: Speed.Run,
    });

    requestAnimationFrame(
      function comsumeBattery() {
        player.health = Math.max(player.health - this.HEALTH_CONSUME_SPEED, 0);
        $health.style.width = `${player.health}%`;
        player.isRunning && requestAnimationFrame(comsumeBattery.bind(this));
        if (player.health === 0) {
          player.isRunning = false;
          this.walk()
        }
      }.bind(this)
    );
  }

  private walk(config: any) {
    const $health = document.querySelector('.health');
    const {player} = state; 
    this.$el.setAttribute('wasd-controls', {
      ...config,
      acceleration: Speed.Walk,
    });

    requestAnimationFrame(
      function chargeBattery() {
        player.health = Math.min(player.health + this.HEALTH_RECOVER_SPEED, 100);
        $health.style.width = `${player.health}%`;
        !player.isRunning && player.health < 100 && requestAnimationFrame(chargeBattery.bind(this));
      }.bind(this)
    );
  }

  private initEventHandler() {
    const { flash, player, game } = state;

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.$footstep.playAudio();
        this.$music.playAudio();

        if (!game.isStarted) {
          game.isStarted = true;
          this.$mainPage.classList.add('off');
        }
        else if (state.player.isFound) {
          state.player.isFound = false;
          this.$gameOverPage.classList.add('off');
          Level.removeStage();
          Level.createStage(1);
          this.$el.setAttribute('wasd-controls', { acceleration: state.player.isRunning ? Speed.Run : Speed.Walk });
        }

        return;
      }

      if (!document.pointerLockElement || !game.isStarted) {
        this.$el.removeAttribute('wasd-controls');
        return;
      }

      if (player.isFound || !game.isStarted) {
        return;
      }

      const controlConfig = this.$el.getAttribute('wasd-controls');
      const footstepConfig = this.$el.getAttribute('footstep');
      const musicConfig = this.$el.getAttribute('music');
      const toggleConfig = this.$el.getAttribute('toggle');

      switch (event.key) {
        case ' ':
          flash.isOn = !flash.isOn;
          if (!flash.isOn) {
            this.flash.turnOff();
            break;
          }
          this.flash.turnOn();
          break;
        case 'Control':
          player.isRunning = !player.isRunning;
          player.isRunning ? this.run(controlConfig) : this.walk(controlConfig);
          this.$el.setAttribute('footstep', {
            ...footstepConfig,
            playbackRate: player.isRunning ? PlaybackRate.Run : PlaybackRate.Default,
          });
          break;
        case '0':
          player.isMuted = !player.isMuted;
          this.$el.setAttribute('footstep', {
            ...footstepConfig,
            muted: player.isMuted,
          });
          this.$el.setAttribute('music', {
            ...musicConfig,
            muted: player.isMuted,
          });
          this.$el.setAttribute('toggle', {
            ...toggleConfig,
            muted: player.isMuted,
          });
          break;
        // for test
        case 'r':
          this.flash.chargeFull();
          break;
        // for test
        case 'Alt':
          this.$el.setAttribute('wasd-controls', { ...controlConfig, acceleration: '1000' });
      }
    });
  }
}
