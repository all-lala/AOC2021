import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

let parsedData = data
  .replace("target area: ", "")
  .split(", ")
  .map((d) => ({
    [d[0]]: d
      .replace(/[xy]+=/, "")
      .split("..")
      .map(Number)
      .sort((a, b) => a - b),
  }));
parsedData = {
  x: parsedData.find((p) => p["x"])["x"],
  y: parsedData.find((p) => p["y"])["y"],
};

function calculate({ pos, velocity }) {
  pos.x += velocity.x;
  pos.y += velocity.y;
  velocity.x -= velocity.x > 0 ? 1 : velocity.x == 0 ? 0 : -1;
  velocity.y -= 1;
  return { pos, velocity };
}

function simulate(objectif, velocity) {
  const pos = { x: 0, y: 0 };
  let next = {};
  let echec = false;
  let reussite = false;
  let maxY = 0;
  while (!echec && !reussite) {
    next = calculate({ pos, velocity });
    if (maxY < next.pos.y) {
      maxY = next.pos.y;
    }
    echec = next.pos.y < objectif.y[0];
    reussite =
      next.pos.y >= objectif.y[0] &&
      next.pos.y <= objectif.y[1] &&
      next.pos.x >= objectif.x[0] &&
      next.pos.x <= objectif.x[1];
  }
  return reussite ? maxY : false;
}

function loop(input) {
  let minVelocity = input.x[0];
  while ((minVelocity * minVelocity) / 2 + minVelocity / 2 > input.x[0]) {
    minVelocity--;
  }
  minVelocity++;

  let maxVelocity = input.x[1];
  maxVelocity++;

  let numberOfWin = 0;
  const velocity = { x: 0, y: 0 };
  for (let i = -100; i < 100; i++) {
    for (let velocityX = minVelocity; velocityX <= maxVelocity; velocityX++) {
      velocity.x = velocityX;
      velocity.y = i;
      const shoot = simulate(input, velocity);
      if (shoot !== false) {
        numberOfWin++;
      }
    }
  }
  return numberOfWin;
}

console.time("test");
print(loop(parsedData));
//print(convertToText(convertHexToBinary(parsedData)));
console.timeEnd("test");
