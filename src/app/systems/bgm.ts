// @ts-nocheck
import {sequences} from '../../utils/sound/sequences';

function generateSong(data, player) {
  // Put the generated song in an Audio element.
  const wave = player.createWave();
  this.audio = document.createElement("audio");
  this.audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
  this.audio.volume = data.volume;
  this.audio.muted = data.muted;
  this.audio.autoplay = data.autoplay;
  this.audio.loop = data.loop;
  this.playMusic();
}

AFRAME.registerSystem('bgm', {
  init() {
    this.audio = undefined;
  },
  initMusic(data) {
    // Initialize music generation (player).
    const player = new CPlayer();
    const generateMusic = generateSong.bind(this);
    player.init(sequences[data.sequence]);

    // Generate music...
    let done = false;
    
    setInterval(function () {
      if (done) {
        return;
      }

      done = player.generate() >= 1;

      if (done) {
        generateMusic(data, player);
      }
    }, 0);
  },
  playMusic() {
    this.audio?.play();
  },
  pauseMusic() {
    this.audio?.pause();
  },
  muteMusic() {
    this.audio?.muted = true;
  },
  unmuteMusic() {
    this.audio?.muted = false;
  },
});
