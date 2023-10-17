const getMean = (arr) => {
  return (
    arr.reduce((accumulator, currNum) => currNum + accumulator, 0) / arr.length
  );
};

const getMedian = (arr) => {
  return arr[Math.floor(arr.length / 2)];
};

const getMode = (arr) => {
  const numCount = {};

  arr.forEach((num) => {
    if (numCount.hasOwnProperty(num)) {
      numCount[num] = numCount[num] + 1;
    } else {
      numCount[num] = 1;
    }
  });

  let max = 0;
  let mode = 0;

  for (let num in numCount) {
    if (numCount[num] > max) {
      max = numCount[num];
      mode = num;
    }
  }

  return +mode;
};

module.exports = {
  getMean,
  getMedian,
  getMode,
};
