const express = require("express");
const ExpressError = require("./expressError");
const { getMean, getMedian, getMode } = require("./helpers");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      throw new ExpressError("Nums are required", 400);
    }

    const nums = req.query.nums
      .split(",")
      .map((num) => +num)
      .sort((a, b) => a - b);
    req.nums = nums;

    if (req.nums.includes(NaN)) {
      throw new ExpressError("Query Parameter must be a number", 400);
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

app.get("/mean", (req, res, next) => {
  const nums = req.nums;
  const mean = getMean(nums);

  return res.status(200).json({
    response: {
      operation: "mean",
      value: mean,
    },
  });
});

app.get("/median", (req, res, next) => {
  const nums = req.nums;
  const median = getMedian(nums);

  return res.status(200).json({
    response: {
      operation: "median",
      value: median,
    },
  });
});

app.get("/mode", (req, res, next) => {
  const nums = req.nums;
  const mode = getMode(nums);

  return res.status(200).json({
    response: {
      operation: "mode",
      value: mode,
    },
  });
});

app.use((err, req, res, next) => {
  const message = err.message;
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    error: {
      message,
    },
  });
});

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
});
