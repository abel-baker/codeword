const { SlashCommandBuilder } = require("discord.js");
const Game = require('../classes/Game');

const slashCodeword = {
  data: new SlashCommandBuilder()
    .setName('codeword')
    .setDescription('Begin a new game of Codeword'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    console.log(`Creating new Game from command ${interaction.id}`);
    const game = new Game(guild, channel);
    client.games.set(address, game);

    await interaction.reply('Beginning new game of Codeword.');
    await interaction.followUp(`Blue words: ${game.blueIndices.map((i) => Array.from(game.wordlist)[i])}`);
    await interaction.followUp(`Red words: ${game.redIndices.map((i) => Array.from(game.wordlist)[i])}`);
    await interaction.followUp({ content: `The assassin word is: ${Array.from(game.wordlist)[game.assassinIndex]}`, ephemeral: true });
  }
};

module.exports = slashCodeword;
