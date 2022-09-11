// @ts-nocheck
import {music} from '../../utils/audio/sequences';

AFRAME.registerSystem('audio', {
  init() {
    this.audio = undefined;
  },
  initAudio(data) {
    const player = new CPlayer();
    const sequence = data.type === 'music' ? music[data.sequence] : sound[data.sequence];
    const audio = document.createElement("audio");
    player.init(sequence);

    let done = false;
    
    setInterval(function () {
      if (done) {
        return;
      }

      done = player.generate() >= 1;

      if (done) {
        const wave = player.createWave();
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.playbackRate = data.playbackRate;
        audio.volume = data.volume;
        audio.muted = data.muted;
        audio.autoplay = true;
        audio.loop = true;
      }
    }, 0);

    this.audio = audio;
    this.audio.play();
  },
  updateAudio(data) {
    this.audio.playbackRate = data.playbackRate;
    this.audio.volume = data.volume;
    this.audio.muted = data.muted;
  },
});
