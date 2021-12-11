import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

function positionFinal(data) {
  let h = 0;
  let d = 0;
  let aim = 0;
  data.forEach((pos) => {
    if (pos.forward !== undefined) {
      h += pos.forward;
      d += pos.forward * aim;
    }
    if (pos.up !== undefined) {
      //d -= pos.up;
      aim -= pos.up;
    }
    if (pos.down !== undefined) {
      //d += pos.down;
      aim += pos.down;
    }
  });
  return h * d;
}

print(positionFinal(data));
