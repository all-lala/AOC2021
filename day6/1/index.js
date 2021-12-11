import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function getFishs(days) {
  let fishs = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i in data) {
    fishs[data[i]]++;
  }

  for (let j = 0; j < days; j++) {
    const newFish = [
      fishs[1],
      fishs[2],
      fishs[3],
      fishs[4],
      fishs[5],
      fishs[6],
      fishs[7] + fishs[0],
      fishs[8],
      fishs[0],
    ];
    fishs = newFish;
  }
  return fishs.reduce((a, v) => (a += v), 0);
}

console.time("test");
print(getFishs(256));
console.timeEnd("test");
