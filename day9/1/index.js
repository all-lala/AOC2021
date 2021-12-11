import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => [...d]);

function getLowPoints(input) {
  let low = 0;
  input.forEach((row, rowNb) => {
    row.forEach((col, colNb) => {
      if (
        (input[rowNb][colNb - 1] === undefined ||
          input[rowNb][colNb - 1] > col) &&
        (input[rowNb][colNb + 1] === undefined ||
          input[rowNb][colNb + 1] > col) &&
        (input[rowNb - 1] === undefined || input[rowNb - 1][colNb] > col) &&
        (input[rowNb + 1] === undefined || input[rowNb + 1][colNb] > col)
      ) {
        low += Number(col) + 1;
      }
    });
  });
  return low;
}

console.time("test");
print(getLowPoints(parsedData));
console.timeEnd("test");
