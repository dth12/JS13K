// getRandomRange(10) => -10 < x < 10
export const getRandomRange = (num: number): number => {
  return Math.random() * num * 2 - num;
};

// getRandomIndex(3) => 0 <= x < 3
export const getRandomIndex = (num: number): number => {
  return Math.floor(Math.random() * num);
};

// getRandomScale() => MIN_NOTE <= x < MAX_NOTE
const getRandomScale = (minScale: number, maxScale: number): number => {
  return Math.floor(Math.random() * (maxScale - minScale)) + minScale; 
};

// getRandomMelody(noteCnt, noteLen) => songData.c.n
export const getRandomMelody = (minScale: number, maxScale: number, patternLen: number, noteLen: number): number[] => {
  const randomMelody: number[] = [];

  for (let i = 0; i < Math.round(patternLen / noteLen); ++i) {
    const randomNote = Array(noteLen);
    randomNote[0] = getRandomScale(minScale, maxScale);
    randomMelody.push(...randomNote);
  }

  return randomMelody;
};

export const isPlaying = (audio: HTMLAudioElement): boolean => {
  return (audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2);
}
