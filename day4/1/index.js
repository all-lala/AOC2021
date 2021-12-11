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

const cards = data.cards.map((dc) => new Card(dc));
let winner = undefined;
let number = 0;
while (data.draw.length && !winner) {
  number = data.draw.shift();
  cards.forEach((card) => {
    card.drawNumber(number);
    if (card.isWins()) {
      winner = card;
    }
  });
}

if (winner) {
  print(winner.totalRest() * number);
} else {
  print("no winner");
}
