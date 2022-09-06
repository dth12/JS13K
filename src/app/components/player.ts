AFRAME.registerComponent('player', {
  dependencies: ['collision'],
  init() {
    this.initialPosition = [0, 3, 0];
  },
  tick() {
    if (this.el.is('started')) {
      return;
    }

    const {x, y, z} = this.el.object3D.position;
    const [oldX, oldY, oldZ] = this.initialPosition;
    if (Math.abs(x - oldX) > 3 || Math.abs(y - oldY) > 3 || Math.abs(z - oldZ) > 3) {
      this.el.addState('started');
    }
  },
});
