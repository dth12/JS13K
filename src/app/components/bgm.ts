AFRAME.registerComponent('bgm', {
  schema: {
    sequence: {default: 'soundbox'},
    volume: {default: 0.5},
    autoplay: {default: false},
    loop: {default: false},
  },
  init() {
    this.system.generateMusic();
  },
});
