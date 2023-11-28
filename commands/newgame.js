const { SlashCommandBuilder } = require("discord.js");
const Game = require('../classes/Game');

const slashNewGame = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Codeword'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    const game = new Game(guild, channel);
    client.games.set(address, game);

    console.log(`Creating new Game from command ${interaction.id}`);
  }
}

module.exports = slashNewGame;
