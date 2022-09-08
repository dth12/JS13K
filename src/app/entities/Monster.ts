export class Monster {
  private readonly HEIGHT = 4;
  private readonly BOUNCING_SPEED = 0.02;
  private $scene = document.querySelector('#gameScene');
  private $el = document.createElement('a-box');

  private isBouncing = false;

  constructor(option: { [key: string]: any } = {}) {
    Object.keys(option).forEach((key) => {
      this.$el.setAttribute(key, option[key]);
    });
    this.$el.classList.add('monster');
    this.$scene.appendChild(this.$el);
    this.startBounce();
  }

  private startBounce() {
    this.isBouncing = true;
    (function bounce(deg = 0) {
      requestAnimationFrame(() => {
        const { x, z } = this.$el.getAttribute('position');
        this.$el.setAttribute('position', {
          x,
          z,
          y: this.HEIGHT + Math.sin(Math.PI * deg) * 0.8,
        });

        if (this.isBouncing) {
          bounce.call(this, deg + this.BOUNCING_SPEED);
        }
      });
    }.bind(this)());
  }

  private stopBounce() {
    this.isBouncing = false;
  }
}
