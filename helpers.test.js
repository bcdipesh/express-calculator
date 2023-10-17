const { getMean, getMedian, getMode } = require("./helpers");

describe("Testing getMean()", () => {
  it("Get the mean of an array of numbers", () =>
    expect(getMean([1, -1, 4, 2])).toEqual(1.5));
});

describe("Testing getMedian()", () =>
  it("Get the median of an array of numbers", () =>
    expect(getMedian([1, 1, 4])).toEqual(1)));

describe("Testing getMode()", () =>
  it("Get the mode of an array of numbers", () =>
    expect(getMode([1, 1, 1, 2, 2, 3])).toEqual(1)));
