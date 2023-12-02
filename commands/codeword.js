const { SlashCommandBuilder } = require("discord.js");
const Game = require('../classes/Game');
const componentGrid = require('../components/componentGrid');

const slashCodeword = {
  data: new SlashCommandBuilder()
    .setName('codeword')
    .setDescription('Begin a new game of Codeword'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    console.log(`Creating new Game from command ${interaction.id}`);
    const game = new Game(guild, channel);
    client.game = game;
    client.games.set(address, game);

    await interaction.reply({ content: `Beginning a new game of Codeword.`,
      components: componentGrid(game, false) });
    await interaction.followUp({ content: `The assassin word is: ${Array.from(game.wordlist)[game.assassinIndex]}`, ephemeral: true,
      components: componentGrid(game, true) });
  }
};

module.exports = slashCodeword;
