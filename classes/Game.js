

class Game {
  constructor(guild, channel) {
    this.status = 'setup';
    this.guild = guild;
    this.channel = channel;
  }

  get address() {
    return `${this.guild.id}-${this.channel.id}`;
  }
}

module.exports = Game;
