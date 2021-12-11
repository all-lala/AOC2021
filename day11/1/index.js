import data from "./dataTest.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => [...d].map(Number));

function avance(grid, max) {
  let count = 0;
  for (let i = 0; i < max; i++) {
    for (let rowI in grid) {
      rowI = Number(rowI);
      for (let colI in grid[rowI]) {
        colI = Number(colI);
        grid[rowI][colI]++;
      }
    }

    for (let rowI in grid) {
      rowI = Number(rowI);
      for (let colI in grid[rowI]) {
        colI = Number(colI);
        flash(grid, rowI, colI);
      }
    }

    count += grid.reduce(
      (aRow, row) => (aRow += row.reduce((a, v) => (a += v === 0 ? 1 : 0), 0)),
      0
    );
  }
  return count;
}

function flash(grid, row, col) {
  if (grid[row][col] <= 9) {
    return;
  }
  grid[row][col] = 0;
  const adj = [
    // top
    {
      type: "top",
      row: row - 1,
      col: col,
    },
    // bottom
    {
      type: "bottom",
      row: row + 1,
      col: col,
    },
    // left
    {
      type: "left",
      row: row,
      col: col - 1,
    },
    // right
    {
      type: "right",
      row: row,
      col: col + 1,
    },
    // topLeft
    {
      type: "topLeft",
      row: row - 1,
      col: col - 1,
    },
    // bottomRight
    {
      type: "bottomRight",
      row: row + 1,
      col: col + 1,
    },
    // topRight
    {
      type: "topRight",
      row: row - 1,
      col: col + 1,
    },
    // bottomLeft
    {
      type: "bottomLeft",
      row: row + 1,
      col: col - 1,
    },
  ];
  adj.forEach((pos) => {
    if (
      grid[pos.row] !== undefined &&
      grid[pos.row][pos.col] !== undefined &&
      grid[pos.row][pos.col] > 0
    ) {
      grid[pos.row][pos.col]++;
      if (grid[pos.row][pos.col] > 9) {
        flash(grid, pos.row, pos.col);
      }
    }
  });
}

console.time("test");
print(avance(JSON.parse(JSON.stringify(parsedData)), 100));
console.timeEnd("test");
