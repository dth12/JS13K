import {song} from '../sounds/song.js';

export function generateMusic() {
    //----------------------------------------------------------------------------
    // Music data section
    //----------------------------------------------------------------------------
    
    //----------------------------------------------------------------------------
    // Demo program section
    //----------------------------------------------------------------------------
  
    // Initialize music generation (player).
    const player = new CPlayer();
    player.init(song);
  
    // Generate music...
    const done = false;
    setInterval(function () {
      if (done) {
        return;
      }
  
      done = player.generate() >= 1;
  
      if (done) {
  
        // Put the generated song in an Audio element.
        const wave = player.createWave();
        audio = document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.loop = true;
        audio.play();
      }
    }, 0);
  }