import {MIN_NOTE, MAX_NOTE, MAX_MELODY_LENGTH} from '../app/constants/constant';

// getRandomRange(10) => -10 < x < 10
export const getRandomRange = (num: number): number => {
  return Math.random() * num * 2 - num;
};

// getRandomIndex(3) => 0 <= x < 3
export const getRandomIndex = (num: number): number => {
  return Math.floor(Math.random() * num);
};

// getRandomNote() => MIN_NOTE <= x < MAX_NOTE
export const getRandomNote = (): number => {
  return Math.floor(Math.random() * (MAX_NOTE - MIN_NOTE)) + MIN_NOTE; 
}

// getRandomMelody() => songData.c.n
export const getRandomMelody = (): number[] => {
  const randomMelody: number[] = [];

  for (let i: number = 0; i < MAX_MELODY_LENGTH; ++i) {
    randomMelody.push(...[getRandomNote(),,,,,,,,]);
  }

  return randomMelody;
}
