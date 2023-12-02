const embed = (game, user, guessedIndex) => {
  const out = {
    color: 0xff1500,
    title: `${user} guesses ${Array.from(game.wordlist)[guessedIndex]}`
  }

  return out;
}

module.exports = embed;
