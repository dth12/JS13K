export const generateAudio = (data, sequence) => {
  const player = new CPlayer();
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
      audio.volume = data.volume;
      audio.muted = data.muted;
      audio.loop = true;
    }
  }, 0);

  return audio;
};
