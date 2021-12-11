import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

class Card {
  #rows = [];

  #cols = [];

  constructor(data) {
    this.#rows = data;
    for (let i in data) {
      for (let j in data[i]) {
        if (!this.#cols[j]) {
          this.#cols[j] = [];
        }
        this.#cols[j][i] = data[i][j];
      }
    }
  }

  drawNumber(number) {
    this.#rows = this.#rows.map((row) => {
      return row.filter((cell) => cell != number);
    });
    this.#cols = this.#cols.map((row) => {
      return row.filter((cell) => cell != number);
    });
  }

  isWins() {
    return (
      this.#rows.some((row) => row.length === 0) ||
      this.#cols.some((row) => row.length === 0)
    );
  }

  totalRest() {
    return this.#rows.flat().reduce((a, v) => (a += v), 0);
  }
}

let cards = data.cards.map((dc) => new Card(dc));
let winner = { card: undefined, number: 0 };
let number = 0;
while (data.draw.length) {
  number = data.draw.shift();
  cards.forEach((card) => {
    if (card.isWins()) {
      winner = { card, number };
    }
  });
  cards = cards.filter((card) => !card.isWins());
}

if (winner) {
  print(winner.card.totalRest() * winner.number);
} else {
  print("no winner");
}
