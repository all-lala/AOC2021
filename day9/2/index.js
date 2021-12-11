import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => [...d]);

function getLowPoints(input) {
  let largest = [];
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
        const value = getBassin([...input.map((g) => [...g])], rowNb, colNb, 1);
        largest.push(value);
      }
    });
  });
  largest.sort((a, b) => b - a);

  const three = largest.slice(0, 3);

  return three.reduce((a, v) => (a *= v));
}

function getBassin(grid, row, col, total) {
  grid[row][col] = undefined;
  if (grid[row][col - 1] !== undefined && grid[row][col - 1] != 9) {
    total++;
    total += getBassin(grid, row, col - 1, 0);
  }
  if (grid[row][col + 1] !== undefined && grid[row][col + 1] != 9) {
    total++;
    total += getBassin(grid, row, col + 1, 0);
  }
  if (
    grid[row - 1] !== undefined &&
    grid[row - 1][col] !== undefined &&
    grid[row - 1][col] != 9
  ) {
    total++;
    total += getBassin(grid, row - 1, col, 0);
  }
  if (
    grid[row + 1] !== undefined &&
    grid[row + 1][col] !== undefined &&
    grid[row + 1][col] != 9
  ) {
    total++;
    total += getBassin(grid, row + 1, col, 0);
  }

  return total;
}

console.time("test");
print(getLowPoints(parsedData));
console.timeEnd("test");
