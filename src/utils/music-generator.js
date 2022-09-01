import { song } from "../sounds/song.js";

export function startDemo() {
    // Initialize music generation (player).
    var player = new CPlayer();
    player.init(song);
  
    // Generate music...
    var done = false;
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
  }
