import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => [...d]);

function checkLine(line) {
  const chunkOpen = ["(", "[", "{", "<"];
  const chunkClose = [")", "]", "}", ">"];
  const values = [3, 57, 1197, 25137];
  const toClose = [];
  for (let i in line) {
    const char = line[i];
    if (chunkOpen.includes(line[i])) {
      toClose.unshift(chunkClose[chunkOpen.indexOf(line[i])]);
    } else {
      if (line[i] === toClose[0]) {
        toClose.shift();
      } else {
        return values[chunkClose.indexOf(line[i])];
      }
    }
  }
  return 0;
}

function checkLines(lines) {
  return lines.reduce((a, v) => (a += checkLine(v)), 0);
}

console.time("test");
print(checkLines(parsedData));
console.timeEnd("test");
