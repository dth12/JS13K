// @ts-nocheck
import {music} from '../../utils/audio/sequences';

AFRAME.registerSystem('audio', {
  init() {
    this.audio = undefined;
  },
  initAudio(data) {
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
        audio.volume = data.volume;
        audio.muted = data.muted;
        audio.autoplay = data.autoplay;
        audio.loop = data.loop;
      }
    }, 0);

    this.audio = audio;
    this.playAudio();
  },
  playAudio() {
    this.audio.play();
  },
  pauseAudio() {
    this.audio.pause();
  },
  muteAudio() {
    this.audio.muted = true;
  },
  unmuteAudio() {
    this.audio.muted = false;
  },
});
