import { sequences } from "./sequences";
import { CPlayer } from "./player-small";

export const generateAudio = (data) => {
  const player = new CPlayer();
  const audio = document.createElement("audio");
  player.init(sequences[data.sequence]);

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
      audio.loop = data.loop;
      audio.muted = data.muted;
    }
  }, 0);

  return audio;
};
