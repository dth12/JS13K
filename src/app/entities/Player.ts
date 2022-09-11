import { state } from '../systems/state';
import { Speed } from '../types';
import { Flash } from './Flash';
import option from '../settings/player.json';

export class Player {
  private $gameScene = document.querySelector('#gameScene');
  private $el = document.createElement('a-entity');
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

  private initEventHandler() {
    const { flash, player, game } = state;

    document.addEventListener('keydown', (event) => {
      if (!document.pointerLockElement || !game.isStarted) {
        this.$el.removeAttribute('wasd-controls');
        return;
      }

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
          if (player.isFound) {
            break;
          }

          const controlConfig = this.$el.getAttribute('wasd-controls');
          player.isRunning = !player.isRunning;
          this.$el.setAttribute('wasd-controls', {
            ...controlConfig,
            acceleration: player.isRunning ? Speed.Run : Speed.Walk,
          });
          break;
        case '0':
          const bgmConfig = this.$el.getAttribute('bgm');
          player.isMuted = !player.isMuted;
          this.$el.setAttribute('bgm', {
            ...bgmConfig,
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
