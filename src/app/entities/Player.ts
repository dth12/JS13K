import {Level} from '../entities/Level';
import option from '../settings/player.json';
import {state} from '../systems/state';
import {PlaybackRate, Speed} from '../types';
import {Flash} from './Flash';

export class Player {
  private HEALTH_CONSUME_SPEED = 0.05;
  private HEALTH_RECOVER_SPEED = 0.01;
  private $gameScene = document.querySelector('#gameScene');
  private $mainPage = document.querySelector('.ui_main');
  private $gameOverPage = document.querySelector('.ui_game_over');
  private $health = document.querySelector('.health');
  private $el = document.createElement('a-entity');
  // @ts-ignore
  private $footstep = this.$gameScene.systems['footstep'];
  // @ts-ignore
  private $glitch = this.$gameScene.systems['glitch'];
  // @ts-ignore
  private $music = this.$gameScene.systems['music'];
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
    const {player} = state;
    this.$el.setAttribute('wasd-controls', {
      ...config,
      acceleration: Speed.Run,
    });

    requestAnimationFrame(
      function comsumeHealth() {
        if(player.isFound || state.game.isClear) {
          return;
        }
        const playerVelocity = this.$el.components['wasd-controls'].velocity;
        const isMoving = Math.abs(playerVelocity.x) > 5 || Math.abs(playerVelocity.y) > 5 || Math.abs(playerVelocity.z) > 5;

        player.health = Math.max(player.health - (isMoving ? this.HEALTH_CONSUME_SPEED : 0), 0);
        this.$health.style.width = `${player.health}%`;
        player.isRunning && requestAnimationFrame(comsumeHealth.bind(this));
        if (player.health === 0) {
          player.isRunning = false;
          this.walk()
        }
      }.bind(this)
    );
  }

  private walk(config: any) {
    const {player} = state;
    this.$el.setAttribute('wasd-controls', {
      ...config,
      acceleration: Speed.Walk,
    });

    requestAnimationFrame(
      function chargeHealth() {
        if(player.isFound) {
          return;
        }
        player.health = Math.min(player.health + this.HEALTH_RECOVER_SPEED, 100);
        this.$health.style.width = `${player.health}%`;
        !player.isRunning && player.health < 100 && requestAnimationFrame(chargeHealth.bind(this));
      }.bind(this)
    );
  }

  private resetStatus() {
    const { flash, player, game } = state;

    game.isClear = false;

    flash.isOn = false;
    this.flash.turnOff();
    player.isRunning = false;

    flash.battery = 100;
    player.health = 100;

    document.querySelector('.health').style.width = '100%';
    document.querySelector('.battery').style.width = '100%';

    player.nearMonsters = [];
  }

  // for test
  private chargeFull() {
    state.player.health = 100;
    this.$health.style.width = `${state.flash.battery}%`;
  }

  private initEventHandler() {
    const { flash, player, game } = state;

    document.addEventListener('player-dead', (event) => {
      this.$el.removeAttribute('look-controls');
      const player = this.$el;
      // @ts-ignore
      let {x, y, z} = event.detail;
      const {x: px, y: py, z: pz} = player.object3D.position;
      // @ts-ignore
      x -= (x - px) * 2;
      z -= (z - pz) * 2;

      // @ts-ignore
      this.$el.object3D.lookAt(x, y, z);
    })

    document.addEventListener('keydown', (event) => {
      if(game.isClear) {
        return;
      }

      if (event.key === 'Enter') {
        this.$footstep.playAudio();
        this.$glitch.playAudio();
        this.$music.playAudio();

        if (!game.isStarted) {
          game.isStarted = true;
          this.$mainPage.classList.add('off');
          document.querySelector('.ui_items').classList.remove('off');
          document.querySelector('.ui_flash').classList.remove('off');
          document.querySelector('.ui_health').classList.remove('off');
        }
        else if (state.player.isFound) {
          state.player.isFound = false;
          this.$gameOverPage.classList.add('off');
          Level.removeStage();
          Level.createStage(1);
          this.resetStatus();
          // @ts-ignore
          this.$gameScene.systems['game'].resetUi();
          this.$el.setAttribute('look-controls', { pointerLockEnabled: true });
        }

        this.$el.setAttribute('wasd-controls', { acceleration: state.player.isRunning ? Speed.Run : Speed.Walk });
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
      const coinConfig = this.$el.getAttribute('coin');
      const footstepConfig = this.$el.getAttribute('footstep');
      const glitchConfig = this.$el.getAttribute('glitch');
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
          this.$el.setAttribute('coin', {
            ...coinConfig,
            muted: player.isMuted,
          });
          this.$el.setAttribute('footstep', {
            ...footstepConfig,
            muted: player.isMuted,
          });
          this.$el.setAttribute('glitch', {
            ...glitchConfig,
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
          this.chargeFull();
          break;
        // for test
        case 'Alt':
          this.$el.setAttribute('wasd-controls', { ...controlConfig, acceleration: '1000' });
      }
    });
  }
}
