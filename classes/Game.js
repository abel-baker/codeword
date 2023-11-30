const config = require('../config.json');

class Game {
  constructor(guild, channel) {
    this.status = 'setup';
    this.guild = guild;
    this.channel = channel;

    // ordered word set (created from random selection of all words)
    const wordSource = config.word_list;
    this.wordlist = new Set();
    while (this.wordlist.size < 25) {
      const word = wordSource[Math.floor(Math.random() * wordSource.length)];
      this.wordlist.add(word);
    }
    console.log(`Creating word list`, this.wordlist);

    // get ready to assign some words to each team
    const indicesToAssign = [
       0, 1, 2, 3, 4, 
       5, 6, 7, 8, 9,
      10,11,12,13,14,
      15,16,17,18,19,
      20,21,22,23,24];
    let m = 24, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      // beautiful shuffle syntax
      [indicesToAssign[m], indicesToAssign[i]] = [indicesToAssign[i], indicesToAssign[m]];
    }
    console.log(`Shuffled indices`,indicesToAssign);

    // blue indexes (9)
    this.blueIndices = [];
    while (this.blueIndices.length < 9) {
      this.blueIndices.push(indicesToAssign.pop());
    }
    console.log(`Selected 9 blue indices`, this.blueIndices);
    // console.log(`Selected 9 blue words`,this.blueIndices.map((i) => Array.from(this.wordlist)[i]));

    // red indexes (8)
    this.redIndices = [];
    while (this.redIndices.length < 8) {
      this.redIndices.push(indicesToAssign.pop());
    }
    console.log(`Selected 8 red indices`, this.redIndices);
    // console.log(`Selected 8 red words`,this.redIndices.map((i) => Array.from(this.wordlist)[i]));
    // assassin index (1)
    this.assassinIndex = indicesToAssign.pop();
    console.log(`Selected 1 assassin index`, this.assassinIndex);

    // revealed indexes (0 to 25?)
  }

  get address() {
    return `${this.guild.id}-${this.channel.id}`;
  }
}

module.exports = Game;
