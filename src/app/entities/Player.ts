import { Entity } from 'aframe';

export class Player {
  private $el: Entity;
  private $flash: Entity;

  private get isFlashOn() {
    return this.$flash.getAttribute('intensity') !== '0';
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
      if (event.key !== ' ') {
        return;
      }

      this.$flash.setAttribute('intensity', this.isFlashOn ? '0' : '1');
    });
  }
}
