const config = require('../config.json');
const Team = require('../classes/Team');

const embed = (game, user, guessedIndex) => {

  // const color = guessedIndex == game.assassinIndex ? 0xf1b42f
  // : game.blueIndices.includes(Number(guessedIndex)) ? 0x5865F2
  // : game.redIndices.includes(Number(guessedIndex)) ? 0xff1500
  // : 0x888888;

  const guess = guessedIndex == game.assassinIndex ? { color: 0xf1b42f, text: 'the :skull:ASSASSIN!:skull:' }
  : game.blueIndices.includes(Number(guessedIndex)) ? { color: Team.BlueTeam.color, text: `${Team.BlueTeam.agentDescriptor}!` }
  : game.redIndices.includes(Number(guessedIndex)) ? { color: Team.RedTeam.color, text: `${Team.RedTeam.agentDescriptor}!` }
  : { color: 0x888888, text: 'an innocent bystander!' };

  const out = {
    color: guess.color,
    
    author: {
      name: `${user.displayName} guesses ${Array.from(game.wordlist)[guessedIndex].toUpperCase()}`,
      iconURL: user.displayAvatarURL()
    },

    // title: `${user.displayName} guesses ${Array.from(game.wordlist)[guessedIndex].toUpperCase()}`,

    description: `${Array.from(game.wordlist)[guessedIndex].toUpperCase()} is ${guess.text}`,

    // footer: { text: `Next guesser: green team` }
  }

  return out;
}

module.exports = embed;
