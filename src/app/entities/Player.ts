import { state } from '../systems/state';
import { Speed } from '../types';
import { Flash } from './Flash';
import option from '../settings/player.json';

export class Player {
  private $gameScene = document.querySelector('#gameScene');
  private $el = document.createElement('a-entity');
  private $flash: Flash;

  constructor() {
    const playerOption = option as { [key: string]: any };

    Object.keys(playerOption).forEach((key) => {
      this.$el.setAttribute(key, playerOption[key]);
    });
    this.$flash = new Flash(this.$el);
    this.$gameScene.appendChild(this.$el);
    this.initEventHandler();
  }

  private initEventHandler() {
    const { flash, player } = state;

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          flash.isOn = !flash.isOn;
          if (!flash.isOn) {
            this.$flash.turnOff();
            break;
          }
          this.$flash.turnOn();
          break;
        case 'Control':
          const config = this.$el.getAttribute('wasd-controls');
          player.isRunning = !player.isRunning;
          this.$el.setAttribute('wasd-controls', {
            ...config,
            acceleration: player.isRunning ? Speed.Run : Speed.Walk,
          });
          break;
        // for test
        case 'Alt':
          this.$el.setAttribute('wasd-controls', { ...config, acceleration: '1000' });
      }
    });
  }
}
