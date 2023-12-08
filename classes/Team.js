const config = require('../config.json');

class Team {
  constructor(name, color, emojiString = '') {
    this.name = name;
    this.color = parseInt(color);
    this.emojiString = this.emojiString;
    this.agentDescriptor = `an agent for the ${emojiString}${name}${emojiString} team`
  }

  static BlueTeam = new Team("Blue", config.colors.blue, ":blue_square:");
  static RedTeam = new Team("Red", config.colors.red, ":red_circle:");
}

// const RedTeam = new Team("red", config.colors.red);
// const BlueTeam = new Team("blue", config.colors.blue);

module.exports = Team;
