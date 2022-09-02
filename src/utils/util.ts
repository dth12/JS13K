// getRandomRange(10) => -10 < x < 10
export const getRandomRange = (num: number) => {
  return Math.random() * num * 2 - num;
};

// getRandomIndex(3) => 0 <= x < 3
export const getRandomIndex = (num: number) => {
  return Math.floor(Math.random() * num);
};
