import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => d.split("-"));

class Nodes {
  nodes = [];

  findNodeByName(name) {
    return this.nodes.find((node) => node.name === name);
  }

  addNodeByName(name) {
    let node = this.findNodeByName(name);
    if (!node) {
      node = new Node(name);
      this.nodes.push(node);
    }
    return node;
  }
}

class Node {
  name = "";
  isBig = false;
  links = [];

  constructor(name) {
    this.name = name;
    this.isBig = name.toUpperCase() === name;
  }

  addLink(link) {
    if (!this.links.includes(link)) {
      this.push(link);
    }
  }
}

class Links {
  links = [];

  findLink(nodes) {
    return this.links.find(
      (l) => l.isNodeInLink(nodes[0]) && l.isNodeInLink(nodes[1])
    );
  }

  addLink(nodes) {
    let link = this.findLink(nodes);
    if (!link) {
      link = new Link(nodes);
      nodes.forEach((node) => node.links.push(link));
      this.links.push(link);
    }
    return link;
  }
}

class Link {
  nodes = [];

  constructor(nodes) {
    this.nodes = nodes;
  }

  isNodeInLink(node) {
    return this.nodes.includes(node);
  }

  destNode(node) {
    return this.nodes.find((n) => n !== node);
  }
}

function createGraph(inputs) {
  const nodes = new Nodes();
  const links = new Links();
  inputs.forEach((input) => {
    {
      const node1 = nodes.addNodeByName(input[0]);
      const node2 = nodes.addNodeByName(input[1]);
      const link = links.addLink([node1, node2]);
    }
  });
  const firstNode = nodes.findNodeByName("start");
  const result = [];
  nextStep(firstNode, ["start"], result);
  return result.length;
}

function nextStep(node, parcour, result) {
  if (node.name == "end") {
    result.push(parcour);
  } else {
    node.links.forEach((link) => {
      const dest = link.destNode(node);
      if (
        dest.name != "start" &&
        (dest.name === dest.name.toUpperCase() ||
          (dest.name === dest.name.toLowerCase() &&
            (!parcour.includes(dest.name) || !parcourTwiceMiniCave(parcour))))
      ) {
        const nextParcour = [...parcour];
        nextParcour.push(dest.name);
        return nextStep(dest, nextParcour, result);
      }
    });
  }
}

function parcourTwiceMiniCave(parcour) {
  const testParcour = [
    ...new Set(parcour.filter((p) => p.toLowerCase() === p)),
  ];
  return testParcour.some((val) => parcour.filter((p) => p === val).length > 1);
}

console.time("test");
print(createGraph(parsedData));
console.timeEnd("test");
