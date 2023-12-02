const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const wordButton = (index, word, color, active = true) => {
  let style = ButtonStyle.Secondary;
  switch (color) {
    case "blue":
      style = ButtonStyle.Primary; break;
    case "red":
      style = ButtonStyle.Danger; break;
  }
  return new ButtonBuilder()
    .setCustomId(`clickGuess/${index}`)
    .setLabel(word.toUpperCase())
    .setStyle(style)
    .setDisabled(!active);
}

const grid = (game, revealAll = false) => {
  let gridOut = []; // the components property of a message embed is an array of ActionRows

  for (let j = 0; j < 5; j++) {
    let row = []; // make an array of buttons; this will become a new ActionRow for each row
    for (let k = 0; k < 5; k++) {
      let i = j*5 + k; // wordlist index

      let word = Array.from(game.wordlist)[i];
      let revealed = game.revealedIndices.includes(i);

      let color = !revealed && !revealAll ? "gray"
        : game.blueIndices.includes(i) ? "blue"
        : game.redIndices.includes(i) ? "red"
        : "gray";

      let active = !revealed && !revealAll;

      let button = wordButton(i, word, color, active);
      row.push(button);
    }

    gridOut.push(new ActionRowBuilder().addComponents(row));
  }

  return gridOut;
}

module.exports = grid;
