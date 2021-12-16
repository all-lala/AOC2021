import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => d.split("").map(Number));

class Node {
  type = "";
  totalWeight = Infinity;
  links = [];
  parent = null;

  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = Number(weight);
  }

  addLink(node) {
    if (node) {
      this.links.push(node);
    }
  }

  setWeigth(prev) {
    if (!this.totalWeight || prev + this.weight < this.totalWeight) {
      this.totalWeight = prev + this.weight;
    }
  }
}

function boostGrid(grid, mult) {
  console.time("boostGrid");
  const newGrid = [];
  const maxRow = mult * grid.length;
  const maxCol = mult * grid[0].length;
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      if (!newGrid[row]) newGrid[row] = [];
      newGrid[row][col] =
        (grid[row] && grid[row][col]) ||
        ((newGrid[row - grid.length] && newGrid[row - grid.length][col]) ||
          newGrid[row][col - grid[0].length]) + 1;
      if (newGrid[row][col] > 9) newGrid[row][col] = 1;
    }
  }
  console.timeEnd("boostGrid");
  return newGrid;
}

function createGraph(grid) {
  console.time("createGraph");
  const nodes = {};
  let last = "|";
  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      nodes[x + "|" + y] = new Node(x, y, cell);
      last = x + "|" + y;
    })
  );
  nodes["0|0"].type = "start";
  nodes[last].type = "end";

  for (let i in nodes) {
    const top = nodes[nodes[i].x + "|" + (nodes[i].y - 1)];
    nodes[i].addLink(top);
    const bottom = nodes[nodes[i].x + "|" + (nodes[i].y + 1)];
    nodes[i].addLink(bottom);
    const left = nodes[nodes[i].x - 1 + "|" + nodes[i].y];
    nodes[i].addLink(left);
    const right = nodes[nodes[i].x + 1 + "|" + nodes[i].y];
    nodes[i].addLink(right);
  }

  console.timeEnd("createGraph");
  return nodes["0|0"];
}

function findPath(root) {
  console.time("findPath");
  root.totalWeight = 0;
  let routes = [root];
  let position = {};
  while (routes[0].type != "end") {
    routes.sort((a, b) => a.totalWeight - b.totalWeight);
    position = routes.shift();
    position.links.forEach((node) => {
      if (node.type === "end") {
        node.parent = position;
        node.totalWeight = position.totalWeight + node.weight;
        routes = [node];
      } else if (node.totalWeight > node.weight + position.totalWeight) {
        node.parent = position;
        node.totalWeight = position.totalWeight + node.weight;
        if (!routes.includes(node)) {
          routes.push(node);
        }
      }
    });
  }
  console.timeEnd("findPath");
  return routes[0].totalWeight;
}

console.time("test");
print(findPath(createGraph(boostGrid(parsedData, 5))));
console.timeEnd("test");
