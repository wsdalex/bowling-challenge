const readline = require("readline");

class UserInterface {
  constructor(scorecard) {
    this.scorecard = scorecard;
    this.players = [];
  }

  addPlayer(num) {
    if (num <= 4) {
      while (num > 0) {
        const player = { ...this.scorecard };
        this.players.push(player);
        num--;
      }
    }
  }

  getPlayerScore(player) {
    const result = player.calculateScore();
    console.log(result);
    return result;
  }

  addFrame(player, roll1, roll2) {
    player.addFrame(roll1, roll2);
  }
}

module.exports = UserInterface;

// rl.question("What is your name? ", (name) => {
//   console.log(`Hello, ${name}!`);
//   rl.close();
// });
