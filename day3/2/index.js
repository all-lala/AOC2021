import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function getZeroOne(data, index) {
  let one = 0;
  let zero = 0;
  data.forEach((d) => {
    if (d[index] == 0) {
      zero++;
    } else {
      one++;
    }
  });
  return { zero, one };
}

function getData(data, type) {
  let dataArray = data.split("\n");
  let index = 0;
  while (dataArray.length > 1 && index < dataArray[0].length) {
    let { zero, one } = getZeroOne(dataArray, index);
    const filter = type == "co2" ? (zero > one ? 0 : 1) : zero <= one ? 0 : 1;
    dataArray = dataArray.filter((d) => d[index] == filter);
    index++;
  }
  return dataArray[0];
}

const oxygen = getData(data);
const co2 = getData(data, "co2");

print(parseInt(oxygen, 2) * parseInt(co2, 2));
