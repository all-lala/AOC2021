import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function gammaAndEpisilon(data) {
  let result = {
    most: "",
    least: "",
  };
  [...data.split("\n")[0]].forEach((d, i) => {
    const regex = `^[01]{${i}}0.*$`;
    const most =
      data.match(RegExp(regex, "gm")).length > data.split("\n").length / 2;
    result.most += most ? "0" : "1";
    result.least += most ? "1" : "0";
  });
  return parseInt(result.most, 2) * parseInt(result.least, 2);
}

print(gammaAndEpisilon(data));
