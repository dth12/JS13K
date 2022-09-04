import { Entity } from 'aframe';
import { state } from '../systems/state';
import { Light, Speed } from '../types';

export class Player {
  private readonly FLASH_CONSUME_SPEED = 0.1;
  private readonly FLASH_CHARGE_SPEED = 0.01;
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

  private chargeFlashBattery() {
    const $battery = document.querySelector('.battery');
    const { flash } = state;
    requestAnimationFrame(
      function comsumeBattery() {
        flash.battery = Math.min(flash.battery + this.FLASH_CHARGE_SPEED, 100);
        $battery.style.width = `${flash.battery}%`;
        !flash.isOn && requestAnimationFrame(comsumeBattery.bind(this));
      }.bind(this)
    );
  }

  private consumeFlashBattery() {
    const $battery = document.querySelector('.battery');
    const { flash } = state;
    requestAnimationFrame(
      function comsumeBattery() {
        flash.battery = Math.max(flash.battery - this.FLASH_CONSUME_SPEED, 0);
        $battery.style.width = `${flash.battery}%`;
        flash.isOn && requestAnimationFrame(comsumeBattery.bind(this));
        if (flash.battery === 0) {
          flash.isOn = false;
          this.$flash.setAttribute('intensity', Light.Off);
          this.chargeFlashBattery();
        }
      }.bind(this)
    );
  }

  private initEventHandler() {
    const { flash, player } = state;
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          flash.isOn = !flash.isOn;
          if (!flash.isOn) {
            this.$flash.setAttribute('intensity', Light.Off);
            this.chargeFlashBattery();
            break;
          }
          if (flash.battery < 1) {
            flash.isOn = !flash.isOn;
            break;
          }
          this.$flash.setAttribute('intensity', Light.On);
          this.consumeFlashBattery();
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
      }
    });
  }
}
