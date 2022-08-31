// getRandomRange(10) => -10 < x < 10
export const getRandomRange = (num: number) => {
  return Math.random() * num * 2 - num;
};
