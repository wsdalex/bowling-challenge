class Scorecard {
  constructor() {
    this.frames = [];
    this.frameCount = 0;
  }

  calculateScore() {
    if (this.frames.length === 0) {
      return 0;
    }
    this.frameCount = 0;
    return this.frames.reduce((total, frame, index) => {
      total += frame.total;

      if (this.frameCount < 10) {
        if (frame.bonusRolls === 1 && index + 1 < this.frames.length) {
          total += this.getSingleBonus(index + 1);
        }

        if (frame.bonusRolls === 2 && index + 1 < this.frames.length) {
          total += this.getDoubleBonus(index);
        }

        if (
          frame.bonusRolls === 2 &&
          this.frameCount === 9 &&
          index + 1 < this.frames.length
        ) {
          total += this.getTenthFrameBonus(index + 1);
        }
      }

      this.frameCount++;
      return total;
    }, 0);
  }

  getSingleBonus(index) {
    return this.frames[index].roll1;
  }

  getDoubleBonus(index) {
    const nextFrame = this.frames[index + 1];
    const nextRoll = nextFrame.roll1;

    if (nextRoll === 10 && index + 2 < this.frames.length) {
      return nextRoll + this.frames[index + 2].roll1;
    } else {
      return nextFrame.roll1 + nextFrame.roll2;
    }
  }

  getTenthFrameBonus(index) {
    return this.frames[index].roll1 + this.frames[index].roll2;
  }

  getFrames() {
    return this.frames;
  }

  addFrame(roll1, roll2, roll3 = 0) {
    this.frames.push({
      roll1: roll1,
      roll2: roll2,
      roll3: roll3,
      total: roll1 + roll2 + roll3,
      bonusRolls: this.checkRolls(roll1, roll2),
    });
  }

  checkRolls(roll1, roll2) {
    return roll1 === 10 ? 2 : roll1 + roll2 === 10 ? 1 : 0;
  }
}

module.exports = Scorecard;
