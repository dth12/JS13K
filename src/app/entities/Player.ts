import { Entity } from 'aframe';
import { Light, Speed } from '../types';

export class Player {
  private $el: Entity;
  private $flash: Entity;
  private get isRunning() {
    return this.$el.getAttribute('wasd-controls').acceleration === Speed.Run;
  }

  private get isFlashOn() {
    return this.$flash.getAttribute('intensity') !== Light.Off;
  }

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
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          this.$flash.setAttribute('intensity', this.isFlashOn ? Light.Off : Light.On);
          break;
        case 'Control':
          const config = this.$el.getAttribute('wasd-controls');
          this.$el.setAttribute('wasd-controls', { ...config, acceleration: this.isRunning ? Speed.Walk : Speed.Run });
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
