const UserInterface = require("../lib/userInterface");
const Scorecard = require("../lib/scorecard");

const readline = require("readline");

jest.mock("../lib/scorecard"); // Mock Scorecard module

describe("UserInterface", () => {
  let userInterface;
  let scorecard;

  beforeEach(() => {
    Scorecard.mockClear();
    scorecard = new Scorecard();
    userInterface = new UserInterface(scorecard);
  });

  test("Add player", () => {
    userInterface.addPlayer(2);
    expect(userInterface.players).toEqual([scorecard, scorecard]);
  });

  test("Get score", () => {
    userInterface.addPlayer(2);
    scorecard.calculateScore.mockImplementation(() => 0);
    expect(userInterface.getPlayerScore(scorecard)).toBe(0);
    expect(scorecard.calculateScore).toHaveBeenCalledTimes(1);
  });

  test("Add frame", () => {
    userInterface.addPlayer(2);
    scorecard.calculateScore.mockImplementation(() => 7);
    userInterface.addFrame(scorecard, 2, 5);
    expect(scorecard.addFrame).toHaveBeenCalledTimes(1);
    expect(userInterface.getPlayerScore(scorecard)).toBe(7);
  });
});
