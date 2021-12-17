import data from "./dataTest.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data;

function convertHexToBinary(input) {
  return [...input]
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");
}

function convertToText(originInput) {
  if (originInput.length < 5) {
    return 0;
  }
  let input = [...originInput];
  const version = parseInt(input.slice(0, 3).join(""), 2);
  const typeId = parseInt(input.slice(3, 6).join(""), 2);
  let toTest = "";
  let step = 0;
  let totalLength = 0;
  if (typeId != 4) {
    const packetDefLength = input.slice(6, 7) == "0" ? 15 : 11;
    let subPacketLength = 0;
    if (packetDefLength == 15) {
      // by length
      subPacketLength = parseInt(
        input.slice(7, 7 + packetDefLength).join(""),
        2
      );
      input.splice(subPacketLength);
    } else {
      // by number
      const subPacketNumber = parseInt(
        input.slice(7, 7 + packetDefLength).join(""),
        2
      );
      subPacketLength = subPacketNumber * 11;
    }
    toTest = input.slice(
      7 + packetDefLength,
      7 + packetDefLength + subPacketLength
    );
    (totalLength = 7 + packetDefLength), 7 + packetDefLength + subPacketLength;
    step = 11;
  } else {
    toTest = input.slice(6);
    let i = 0;
    while (i % 5 || toTest[i] != "0") {
      i++;
    }
    toTest = toTest.slice(0, i + 5);
    totalLength = 11 + i;
    step = 5;
  }
  let binary = "";
  let datas = [];
  while (binary[0] != "0" && toTest.length) {
    if (toTest[0] == "1") {
      binary = toTest.splice(0, step);
    } else {
      binary = toTest;
    }
    datas.push(binary.join("").slice(1));
  }

  const newInput = originInput.slice(totalLength);

  return version + convertToText(newInput);
}

console.time("test");
print(convertToText(convertHexToBinary(parsedData)));
console.timeEnd("test");
