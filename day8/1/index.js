import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => d.split(" | "));

class SevenSegment {
  top = "";
  topLeft = "";
  topRight = "";
  middle = "";
  bottom = "";
  bottomLeft = "";
  bottomRight = "";

  posibility = {
    top: [],
    topLeft: [],
    topRight: [],
    middle: [],
    bottom: [],
    bottomLeft: [],
    bottomRight: [],
  };
}
const zero = [
  "top",
  "topLeft",
  "topRight",
  "bottom",
  "bottomLeft",
  "bottomRight",
];
const un = ["topRight", "bottomRight"];
const deux = ["top", "topRight", "middle", "bottom", "bottomLeft"];
const trois = ["top", "topRight", "middle", "bottom", "bottomRight"];
const quatre = ["topLeft", "topRight", "middle", "bottomRight"];
const cinq = ["top", "topLeft", "middle", "bottom", "bottomRight"];
const six = ["top", "topLeft", "middle", "bottom", "bottomLeft", "bottomRight"];
const sept = ["top", "topRight", "bottomRight"];
const huit = [
  "top",
  "topLeft",
  "topRight",
  "middle",
  "bottom",
  "bottomLeft",
  "bottomRight",
];
const neuf = ["top", "topLeft", "topRight", "middle", "bottom", "bottomRight"];

function count1478(parsedData) {
  const result = {
    un: 0,
    quatre: 0,
    sept: 0,
    huit: 0,
  };
  let count = 0;
  parsedData.forEach((element) => {
    const output = element[1].split(" ");
    count += output.filter((out) =>
      [un.length, quatre.length, sept.length, huit.length].includes(
        out.trim().length
      )
    ).length;
  });
  return count;
}

console.time("test");
print(count1478(parsedData));
console.timeEnd("test");
