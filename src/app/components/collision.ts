AFRAME.registerComponent('collision', {
  schema: {},
  init() {
    const keyRegex = /key/;

    if (this.el.id === 'player') {
      this.system.registerPlayer(this.el);
    } else if (keyRegex.test(this.el.id)) {
      this.system.registerKey(this.el);
    } else {
      this.system.registerWall(this.el);
    }
  },
  update() {
    if (this.el.id === 'player') {
      this.system.registerPlayer(this.el);
    }
  },
})
