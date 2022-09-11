// @ts-nocheck
import {music} from '../../../utils/sound/sequences';

AFRAME.registerSystem('music', {
  init() {
    this.audio = undefined;
  },
  initMusic(data) {
    const player = new CPlayer();
    const audio = document.createElement("audio");
    player.init(music[data.sequence]);

    let done = false;
    
    setInterval(function () {
      if (done) {
        return;
      }

      done = player.generate() >= 1;

      if (done) {
        const wave = player.createWave();
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.muted = data.muted;
        audio.loop = true;
      }
    }, 0);

    this.audio = audio;
    this.audio.play();
  },
  updateMusic(data) {
    this.audio.muted = data.muted;
  },
});
