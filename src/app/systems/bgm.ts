// @ts-nocheck
import {sequences} from '../../utils/sound/sequences';

AFRAME.registerSystem('bgm', {
  generateMusic(data) {
    // Initialize music generation (player).
    const player = new CPlayer();
    player.init(sequences[data.sequence]);

    // Generate music...
    let done = false;
    
    setInterval(function () {
      if (done) {
        return;
      }

      done = player.generate() >= 1;

      if (done) {
        // Put the generated song in an Audio element.
        const wave = player.createWave();
        const audio = document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.volume = data.volume;
        audio.autoplay = data.autoplay;
        audio.loop = data.loop;
        audio.play();
      }
    }, 0);
  }
});
