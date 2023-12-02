const componentGrid = require('../components/componentGrid');

const clickGuess = {
  name: 'clickGuess',
  async execute(interaction) {
    const { customId, client } = interaction;
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

    const content = `The word guessed is ${word.toUpperCase()}.`;
    await interaction.update({ components: [] });
    await interaction.followUp({ content, components: componentGrid(game, false) });
    // await interaction.editReply()
  }
}

module.exports = clickGuess;
