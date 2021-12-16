import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => d.split(""));

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
    if (node && !this.links.includes(node)) {
      this.links.push(node);
      node.addLink(this);
    }
  }

  setWeigth(prev) {
    if (!this.totalWeight || prev + this.weight < this.totalWeight) {
      this.totalWeight = prev + this.weight;
    }
  }
}

function createGraph(grid) {
  const nodes = [];
  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      nodes.push(new Node(x, y, cell));
    })
  );
  nodes[0].type = "start";
  nodes[nodes.length - 1].type = "end";

  nodes.forEach((node) => {
    const top = nodes.find((n) => n.x === node.x && n.y === node.y - 1);
    node.addLink(top);
    const bottom = nodes.find((n) => n.x === node.x && n.y === node.y + 1);
    node.addLink(bottom);
    const left = nodes.find((n) => n.x === node.x - 1 && n.y === node.y);
    node.addLink(left);
    const right = nodes.find((n) => n.x === node.x + 1 && n.y === node.y);
    node.addLink(right);
  });

  return nodes;
}

function findPath(graph) {
  const root = graph[0];
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
  console.log(routes[0], routes[0].totalWeight);
  return routes[0].totalWeight;
}

console.time("test");
print(findPath(createGraph(parsedData)));
console.timeEnd("test");
