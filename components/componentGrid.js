const config = require('../config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const wordButton = (index, word, color, active = true, assassin = false) => {
  let style = ButtonStyle.Secondary;
  switch (color) {
    case "blue":
      style = ButtonStyle.Primary; break;
    case "red":
      style = ButtonStyle.Danger; break;
  }
  const buttonOut = new ButtonBuilder()
    .setCustomId(`clickGuess/${index}`)
    .setLabel(word.toUpperCase())
    .setStyle(style)
    .setDisabled(!active);

  if (assassin && !active) buttonOut.setEmoji('☠️');
  return buttonOut;
}

const grid = (game, revealAll = false) => {
  let gridOut = []; // the components property of a message embed is an array of ActionRows
  const rows = config.grid_size.grid_size_rows;
  const cols = config.grid_size.grid_size_cols;

  for (let j = 0; j < rows; j++) {
    let row = []; // make an array of buttons; this will become a new ActionRow for each row
    for (let k = 0; k < cols; k++) {
      let i = j*rows + k; // wordlist index

      let word = Array.from(game.wordlist)[i];
      let revealed = game.revealedIndices.includes(i);
      let assassin = game.assassinIndex == i;

      let color = !revealed && !revealAll ? "gray"
        : game.blueIndices.includes(i) ? "blue"
        : game.redIndices.includes(i) ? "red"
        : "gray";

      let active = !revealed && !revealAll;

      let button = wordButton(i, word, color, active, assassin);
      row.push(button);
    }

    gridOut.push(new ActionRowBuilder().addComponents(row));
  }

  return gridOut;
}

module.exports = grid;
