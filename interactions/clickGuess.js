const componentGrid = require('../components/componentGrid');
const embedGuess = require('../components/embedGuess');
const wait = require('node:timers/promises').setTimeout;

const clickGuess = {
  name: 'clickGuess',
  async execute(interaction) {
    const { customId, client, member } = interaction;
    const game = client.game;
    const index = customId.split('/')[1];

    const word = Array.from(game.wordlist)[index];

    if (Array.from(game.revealedIndices).includes(index)) {
      await interaction.reply({ content: `This word has already been guessed: ${word.toUpperCase()}`, ephemeral: true });
      return;
    }

    game.revealedIndices.push(Number(index));
    console.log(`Index ${index} added to revealedIndices`, game.revealedIndices);
    const team = index == game.assassinIndex ? "assassin"
    : game.blueIndices.includes(index) ? "blue"
    : game.redIndices.includes(index) ? "red"
    : "none";

    const content = `${member} guesses *${word.toUpperCase()}*`;
    await interaction.update({ components: [] });
    // await interaction.followUp({ embeds: [embedGuess(game, member, index)] });
    // await wait(500);
    // await interaction.followUp({ content: `Score: blue(2) red(0)`, components: componentGrid(game, false) });
    await interaction.followUp({ embeds: [embedGuess(game, member, index)], components: componentGrid(game, false) });

  }
}

module.exports = clickGuess;
