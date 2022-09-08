import { sequences } from "./sequences.js";

export const generateMusic = () => {
  // Initialize music generation (player).
  const player = new CPlayer();
  player.init(sequences.soundbox);

  // Generate music...
  let done = false;
  
  setInterval(function () {
    if (done) {
      return;
    }

    done = player.generate() >= 1;

    if (done) {
      // Put the generated song in an Audio element.
      var wave = player.createWave();
      var audio = document.createElement("audio");
      audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
      audio.loop = true;
      audio.play();
    }
  }, 0);
};
