import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n\n");

function makeGrid(input) {
  const grid = [];
  const datas = input.split("\n").map((d) => d.split(","));
  const maxX = Math.max(...datas.map((i) => i[0]));
  const maxY = Math.max(...datas.map((i) => i[1]));
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (!grid[y]) grid[y] = [];
      grid[y][x] = ".";
    }
  }
  datas.forEach((coord) => {
    grid[Number(coord[1])][Number(coord[0])] = "#";
  });
  return grid;
}

function fold(grid, type, pos) {
  const resultGrid = [];
  if (type == "x") {
    for (let y in grid) {
      for (let x = 0; x < grid[y].length; x++) {
        if (x < pos) {
          if (!resultGrid[y]) resultGrid[y] = [];
          resultGrid[y][x] = grid[y][x];
        } else if (x > pos) {
          if (!resultGrid[y]) resultGrid[y] = [];
          resultGrid[y][pos - (x - pos)] =
            grid[y][x] !== resultGrid[y][pos - (x - pos)] ? "#" : grid[y][x];
        }
      }
    }
  } else {
    for (let y = 0; y < pos; y++) {
      resultGrid[y] = grid[y] ? [...grid[y]] : [];
    }
    for (let y = 1; y <= pos; y++) {
      for (let x = 0; x < resultGrid[pos - y].length; x++) {
        if (!resultGrid[pos - y]) resultGrid[pos - y] = [];
        if (grid[pos + y]) {
          resultGrid[pos - y][x] =
            grid[pos + y][x] !== resultGrid[pos - y][x]
              ? "#"
              : grid[pos + y][x];
        }
      }
    }
  }
  return resultGrid;
}

function oneFold(input) {
  let grid = makeGrid(input[0]);
  const folds = input[1]
    .split("\n")
    .map((d) => d.replace("fold along ", "").split("="));

  folds.forEach((f) => {
    grid = fold(grid, f[0], Number(f[1]));
  });

  console.log(grid);
}

console.time("test");
print(oneFold(parsedData));
console.timeEnd("test");
