const Scorecard = require("../lib/scorecard");

describe("Scorecard", () => {
  let scorecard = null;

  beforeEach(() => {
    scorecard = new Scorecard();
  });

  test("Scorecard creattion", () => {
    expect(scorecard.calculateScore()).toBe(0);
  });

  test("getFrame", () => {
    expect(scorecard.getFrames()).toEqual([]);
  });

  test("checkRolls", () => {
    expect(scorecard.checkRolls(5, 5)).toBe(1);
    expect(scorecard.checkRolls(10, 0)).toBe(2);
    expect(scorecard.checkRolls(2, 5)).toBe(0);
  });

  test("addFrame", () => {
    scorecard.addFrame(2, 5);
    scorecard.addFrame(2, 5);
    expect(scorecard.getFrames()).toEqual([
      {
        roll1: 2,
        roll2: 5,
        roll3: 0,
        total: 7,
        bonusRolls: 0,
      },
      {
        roll1: 2,
        roll2: 5,
        roll3: 0,
        total: 7,
        bonusRolls: 0,
      },
    ]);
  });

  test("simple score calaculation", () => {
    scorecard.addFrame(2, 5);
    scorecard.addFrame(2, 5);
    expect(scorecard.calculateScore()).toBe(14);
  });

  test("Spare with one frame", () => {
    scorecard.addFrame(5, 5);
    expect(scorecard.calculateScore()).toBe(10);
  });

  test("Spare adds bonus score", () => {
    scorecard.addFrame(5, 5);
    scorecard.addFrame(2, 5);
    expect(scorecard.calculateScore()).toBe(19);
  });

  test("Multiple spare game", () => {
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    scorecard.addFrame(5, 5);
    expect(scorecard.calculateScore()).toBe(130);
  });

  test("Strike adds bonus score", () => {
    scorecard.addFrame(10, 0);
    scorecard.addFrame(2, 5);
    expect(scorecard.calculateScore()).toBe(24);
  });

  test("multiple strikes", () => {
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    expect(scorecard.calculateScore()).toBe(90);
  });

  test("perfect game", () => {
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(10, 10, 10);
    expect(scorecard.calculateScore()).toBe(300);
  });

  test("random game", () => {
    scorecard.addFrame(10, 0);
    scorecard.addFrame(2, 2);
    scorecard.addFrame(2, 8);
    scorecard.addFrame(4, 4);
    scorecard.addFrame(2, 0);
    scorecard.addFrame(7, 3);
    scorecard.addFrame(4, 5);
    scorecard.addFrame(10, 0);
    scorecard.addFrame(7, 2);
    scorecard.addFrame(10, 0, 0);
    expect(scorecard.calculateScore()).toBe(103);
  });

  test("gutter game", () => {
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0, 0);
    expect(scorecard.calculateScore()).toBe(0);
  });
});
