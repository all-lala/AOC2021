import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n\n");

const besePolymer = parsedData[0];
const actions = getActions(parsedData[1]);

function getActions(input) {
  return input.split("\n").map((inp) => {
    const action = inp.split(" -> ");
    return {
      input: action[0],
      count: 0,
      output: [action[0][0] + action[1], action[1] + action[0][1]],
    };
  });
}

function polymerise(actions, letters, base) {
  if (base) {
    [...base].forEach((char, i) => {
      if (!letters[char]) letters[char] = 0;
      letters[char]++;
      if (i === base.length - 1) {
        return char;
      } else {
        const action = actions.find((a) => a.input === char + base[i + 1]);
        action.count++;
      }
    });
  }
  const newActions = actions.map((a) => ({ ...a, ...{ count: 0 } }));
  actions.forEach((a) => {
    if (!letters[a.output[0][1]]) letters[a.output[0][1]] = 0;
    letters[a.output[0][1]] += a.count;
    a.output.forEach((out) => {
      const newAction = newActions.find((na) => na.input === out);
      newAction.count += a.count;
    });
  });

  return newActions;
}

function test(polymer, actions, count) {
  let result = actions;
  let letters = {};
  for (let i = 0; i < count; i++) {
    result = polymerise(result, letters, i == 0 ? polymer : undefined);
  }

  return (
    Math.max(...Object.values(letters)) - Math.min(...Object.values(letters))
  );
}

console.time("test");
print(test(besePolymer, actions, 40));
console.timeEnd("test");
