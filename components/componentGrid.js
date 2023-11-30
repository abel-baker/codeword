const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const wordButton = (index, word, color) => {
  let style = ButtonStyle.Secondary;
  switch (color) {
    case "blue":
      style = ButtonStyle.Primary; break;
    case "red":
      style = ButtonStyle.Danger; break;
  }
  return new ButtonBuilder()
    .setCustomId(index)
    .setLabel(word.toUpperCase())
    .setStyle(style);
}

const grid = (game) => {
  return new ActionRowBuilder();
}

module.exports = grid;
