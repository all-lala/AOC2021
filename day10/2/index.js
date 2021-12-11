import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => [...d]);

function checkLine(line) {
  const chunkOpen = ["(", "[", "{", "<"];
  const chunkClose = [")", "]", "}", ">"];
  const values = [1, 2, 3, 4];
  const toClose = [];
  for (let i in line) {
    const char = line[i];
    if (chunkOpen.includes(line[i])) {
      toClose.unshift(chunkClose[chunkOpen.indexOf(line[i])]);
    } else {
      if (line[i] === toClose[0]) {
        toClose.shift();
      } else {
        return 0;
      }
    }
  }
  return toClose.reduce(
    (a, v) => (a = a * 5 + values[chunkClose.indexOf(v)]),
    0
  );
}

function checkLines(lines) {
  const result = lines.map((v) => checkLine(v)).filter((v) => v != 0);
  result.sort((a, b) => a - b);
  return result[~~(result.length / 2)];
}

console.time("test");
print(checkLines(parsedData));
console.timeEnd("test");
