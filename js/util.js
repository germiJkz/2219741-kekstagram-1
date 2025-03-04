const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max]=[max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringLength = (str, max = 100) => str.length <= max;

export {checkStringLength};
export {getRandomInt};
