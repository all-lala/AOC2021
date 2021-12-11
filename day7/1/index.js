import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function getMinimalMiddle(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);

  let best = Infinity;
  let bestNumber = min;

  for (let i = min; i <= max; i++) {
    const dist = data.reduce((a, v) => (a += distance(v, i)), 0);
    if (dist < best) {
      best = dist;
      bestNumber = i;
    }
  }

  return best;
}

function distance(a, b) {
  return a < b ? b - a : a - b;
}

console.time("test");
print(getMinimalMiddle(data));
console.timeEnd("test");
