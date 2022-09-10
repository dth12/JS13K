AFRAME.registerComponent('collision', {
  schema: {},
  init() {
    if (this.el.id === 'player') {
      this.system.registerPlayer(this.el);
    } else if (this.el.id === 'key') {
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
