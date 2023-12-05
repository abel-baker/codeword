const embed = (game, user, guessedIndex) => {

  const color = guessedIndex == game.assassinIndex ? 0xf1b42f
  : game.blueIndices.includes(Number(guessedIndex)) ? 0x5865F2
  : game.redIndices.includes(Number(guessedIndex)) ? 0xff1500
  : 0x888888;

  const guess = guessedIndex == game.assassinIndex ? { color: 0xf1b42f, text: 'the :skull:ASSASSIN!:skull:' }
  : game.blueIndices.includes(Number(guessedIndex)) ? { color: 0x5865F2, text: 'an agent for the :blue_circle:BLUE:blue_circle: team!' }
  : game.redIndices.includes(Number(guessedIndex)) ? { color: 0xff1500, text: 'an agent for the :red_square:RED:red_square: team!' }
  : { color: 0x888888, text: 'an innocent bystander!' };

  const out = {
    color: guess.color,
    
    author: {
      name: `${user.displayName} guesses ${Array.from(game.wordlist)[guessedIndex].toUpperCase()}`,
      iconURL: user.displayAvatarURL()
    },

    // title: `${user.displayName} guesses ${Array.from(game.wordlist)[guessedIndex].toUpperCase()}`,

    description: `${Array.from(game.wordlist)[guessedIndex].toUpperCase()} is ${guess.text}`
  }

  return out;
}

module.exports = embed;
