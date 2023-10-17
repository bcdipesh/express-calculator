const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const nums = req.query.nums
    .split(",")
    .map((num) => +num)
    .sort((a, b) => a - b);
  req.nums = nums;

  return next();
});

app.get("/mean", (req, res, next) => {
  const nums = req.nums;
  const mean =
    nums.reduce((accumulator, currNum) => currNum + accumulator, 0) /
    nums.length;

  return res.status(200).json({
    response: {
      operation: "mean",
      value: mean,
    },
  });
});

app.get("/median", (req, res, next) => {
  const nums = req.nums;
  const median = nums[Math.floor(nums.length / 2)];

  return res.status(200).json({
    response: {
      operation: "median",
      value: median,
    },
  });
});

app.get("/mode", (req, res, next) => {
  const nums = req.nums;
  const numCount = {};

  nums.forEach((num) => {
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

  return res.status(200).json({
    response: {
      operation: "mode",
      value: mode,
    },
  });
});

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
});
