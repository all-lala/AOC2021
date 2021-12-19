import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map(JSON.parse);

function addition(input, toAdd) {
  return [input, toAdd];
}

function split(input) {
  return JSON.parse(
    JSON.stringify(input).replace(/(\d{2,})/, (c, val) => {
      return JSON.stringify([Math.floor(val / 2), Math.ceil(val / 2)]);
    })
  );
}

function explode(input) {
  let pair = [];
  while ((pair = findFourPair(input))) {
    input = pair.result;
    const regex = "(\\d*)([\\[\\],]*)-1([\\[\\],]*)(\\d*)";

    function remplacement(chaine, p1, p2, p3, p4) {
      const beforeNumber = p1 && Number(p1) + pair.finded[0];
      const beforeString = p2;
      const afterString = p3;
      const afterNumber = p4 && Number(p4) + pair.finded[1];

      return beforeNumber + beforeString + 0 + afterString + afterNumber;
    }

    if (JSON.stringify(input).replace(/\s/g, "").match(RegExp(regex))) {
      const inputString = JSON.stringify(input)
        .replace(/\s/g, "")
        .replace(RegExp(regex), remplacement);

      input = JSON.parse(inputString);
    } else {
      throw Error("Pas trouvé");
    }
  }
  return input;
}

function findFourPair(input) {
  let finded = false;
  const result = input.map((f) => {
    return Array.isArray(f)
      ? f.map((s) => {
          return Array.isArray(s)
            ? s.map((t) => {
                return Array.isArray(t)
                  ? t.map((f) => {
                      if (Array.isArray(f) && !finded) {
                        finded = f;
                        return -1;
                      } else {
                        return f;
                      }
                    })
                  : t;
              })
            : s;
        })
      : f;
  });
  return finded && { result, finded };
}

function compute(list) {
  let result = [];
  for (let i in list) {
    if (i == 0) {
      result = list[i];
    } else {
      result = addition(result, list[i]);
      let avance = true;

      while (avance) {
        const resultBefore = JSON.stringify(result);
        result = explode(result);
        result = split(result);

        avance = resultBefore != JSON.stringify(result);
      }
    }
  }
  return result;
}

function magnitude(input) {
  if (!Array.isArray(input)) {
    return input;
  }
  if (input.length > 1) {
    return magnitude(input[0]) * 3 + magnitude(input[1]) * 2;
  }
}

function maxMagnitudeofTwo(input) {
  let max = 0;
  for (let i in input) {
    for (let j in input) {
      if (i != j) {
        const magni = magnitude(compute([input[i], input[j]]));
        if (magni > max) {
          max = magni;
        }
      }
    }
  }
  return max;
}

console.time("test");
print(maxMagnitudeofTwo(parsedData));
//explode(parsedData);
//print(convertToText(convertHexToBinary(parsedData)));
console.timeEnd("test");
