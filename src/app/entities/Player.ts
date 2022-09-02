import { Entity } from 'aframe';
import { state } from '../systems/state';
import { Light, Speed } from '../types';

export class Player {
  private $el: Entity;
  private $flash: Entity;

  constructor(playerOption: { [key: string]: any }, lightOption: { [key: string]: any }) {
    const $gameScene = document.querySelector('#gameScene');

    this.initFlash(lightOption);
    this.initPlayer(playerOption);

    this.$el.appendChild(this.$flash);
    $gameScene.appendChild(this.$el);

    this.initEventHandler();
  }

  private initFlash(option: { [key: string]: any }) {
    this.$flash = document.createElement('a-light');
    Object.keys(option).forEach((key) => {
      this.$flash.setAttribute(key, option[key]);
    });
  }

  private initPlayer(option: { [key: string]: any }) {
    this.$el = document.createElement('a-entity');
    this.$el.id = 'player';
    Object.keys(option).forEach((key) => {
      this.$el.setAttribute(key, option[key]);
    });
  }

  private initEventHandler() {
    const { flash, player } = state;
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          flash.isOn = !flash.isOn;
          if (flash.isOn) {
            this.$flash.setAttribute('intensity', Light.On);
            break;
          }
          this.$flash.setAttribute('intensity', Light.Off);
          break;
        case 'Control':
          const config = this.$el.getAttribute('wasd-controls');
          player.isRunning = !player.isRunning;
          this.$el.setAttribute('wasd-controls', {
            ...config,
            acceleration: player.isRunning ? Speed.Run : Speed.Walk,
          });
          break;
        case 'Alt':
          // for test
          this.$el.setAttribute('wasd-controls', { ...config, acceleration: '1000' });
        default:
          console.log(event.key);
      }
    });
  }
}
