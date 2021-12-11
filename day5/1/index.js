import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function createGrid(data) {
  const max = data.reduce(
    (a, v) => {
      a.x = Math.max(a.x, v[0].x, v[1].x);
      a.y = Math.max(a.y, v[0].y, v[1].y);
      return a;
    },
    { x: 0, y: 0 }
  );

  const grid = new Array(max.x + 1);
  grid.fill("");
  for (let i in grid) {
    grid[i] = new Array(max.y + 1);
    grid[i].fill(0);
  }

  return grid;
}

function drawInGrid(coord) {
  if (coord[0].x === coord[1].x) {
    const x = coord[0].x;
    const min = Math.min(coord[0].y, coord[1].y);
    const max = Math.max(coord[0].y, coord[1].y);
    for (let y = min; y <= max; y++) {
      grid[x][y]++;
    }
  } else if (coord[0].y === coord[1].y) {
    const y = coord[0].y;
    const min = Math.min(coord[0].x, coord[1].x);
    const max = Math.max(coord[0].x, coord[1].x);
    for (let x = min; x <= max; x++) {
      grid[x][y]++;
    }
  }
}

console.time("test");
const grid = createGrid(data);

data.forEach((d) => drawInGrid(d));

print(grid.flat().filter((v) => v > 1).length);
console.timeEnd("test");
