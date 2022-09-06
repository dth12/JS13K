AFRAME.registerComponent('collision', {
  schema: {
    keyId: {default: -1},
  },
  init() {
    if (this.el.id === 'player') {
      this.system.registerPlayer(this.el);
    } else if (this.el.id === 'key') {
      this.system.registerKey(this.el);
      this.el.addEventListener('find-key', () => {console.log('find-key')});
    } else {
      this.system.registerWall(this.el);
    }
  },
  update() {
    if (this.el.id === 'player') {
      this.system.registerPlayer(this.el);
    }
  },
  tick() {
    // if (this.el.id === 'player') {
    //   this.system.detectCollision();
    // }
  },
})
