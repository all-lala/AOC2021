import data from "./data.js";
const parsedData = data;

//import data from "./dataTest.js";
//const parsedData = data[9];

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function convertHexToBinary(input) {
  return [...input]
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");
}

function analyse(input) {
  const version = parseInt(input.slice(0, 3), 2);
  const type = parseInt(input.slice(3, 6), 2);

  if (type === 4) {
    let binary = "";
    let datas = "";
    let i = 6;
    while (binary[0] != 0) {
      i += 5;
      binary = input.slice(i - 5, i);
      datas += binary.slice(1);
    }
    const value = parseInt(datas, 2);
    input = input.slice(i);
    return { version, type, value, size: i };
  } else {
    const packetDefLength = input.slice(6, 7) == "0" ? 15 : 11;
    const subPacketInfo = parseInt(input.slice(7, 7 + packetDefLength), 2);
    const value = [];
    let totalSize = 0;
    if (packetDefLength == 15) {
      input = input.slice(7 + packetDefLength);
      while (totalSize < subPacketInfo) {
        const next = analyse(input);
        value.push(next);
        totalSize += next.size;
        input = input.slice(next.size);
      }
    } else {
      input = input.slice(7 + packetDefLength);
      for (let i = 0; i < subPacketInfo; i++) {
        const next = analyse(input);
        value.push(next);
        totalSize += next.size;
        input = input.slice(next.size);
      }
    }
    return {
      version,
      type,
      value,
      size: 7 + packetDefLength + totalSize,
    };
  }
}

function calculate(datas) {
  switch (datas.type) {
    case 0:
      return sum(datas.value.map(calculate));
    case 1:
      return product(datas.value.map(calculate));
    case 2:
      return minimum(datas.value.map(calculate));
    case 3:
      return maximum(datas.value.map(calculate));
    case 4:
      return datas.value;
    case 5:
      return greaterThan(calculate(datas.value[0]), calculate(datas.value[1]));
    case 6:
      return lessThan(calculate(datas.value[0]), calculate(datas.value[1]));
    case 7:
      return equalTo(calculate(datas.value[0]), calculate(datas.value[1]));
  }
}

function sum(arg) {
  return Array.isArray(arg) ? arg.reduce((a, v) => (a += v), 0) : arg;
}

function product(arg) {
  return Array.isArray(arg) ? arg.reduce((a, v) => (a *= v), 1) : arg;
}

function minimum(arg) {
  return Array.isArray(arg) ? Math.min(...arg) : arg;
}

function maximum(arg) {
  return Array.isArray(arg) ? Math.max(...arg) : arg;
}

function greaterThan(...arg) {
  return arg[0] > arg[1] ? 1 : 0;
}

function lessThan(...arg) {
  return arg[0] < arg[1] ? 1 : 0;
}

function equalTo(...arg) {
  return arg[0] == arg[1] ? 1 : 0;
}

console.time("test");
print(calculate(analyse(convertHexToBinary(parsedData))));
console.timeEnd("test");
