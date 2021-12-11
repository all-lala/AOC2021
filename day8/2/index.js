import data from "./data.js";

function print(txt) {
  document.getElementById("reponse").innerHTML = txt;
}

const parsedData = data.split("\n").map((d) => d.split(" | "));

class SevenSegment {
  segments = [
    "top",
    "topLeft",
    "topRight",
    "middle",
    "bottom",
    "bottomLeft",
    "bottomRight",
  ];

  top = "abcdefg";
  topLeft = "abcdefg";
  topRight = "abcdefg";
  middle = "abcdefg";
  bottom = "abcdefg";
  bottomLeft = "abcdefg";
  bottomRight = "abcdefg";

  get AG() {
    const result = {};
    this.segments.forEach((v) => (result[this[v]] = v));
    return result;
  }

  testPosibilities(segments, testPos) {
    segments.forEach((seg) => {
      this.testPossibility(seg, testPos);
    });
    this.segments.forEach((seg) => {
      if (this[seg].length == 1) {
        this.cleanOther(seg, this[seg]);
      }
    });
  }

  testPossibility(segment, testPos) {
    this[segment] = testPos
      .filter((char) => this[segment].match(char))
      .join("");

    if (this[segment].length == 1) {
      this.cleanOther(segment, this[segment]);
    }
  }

  cleanOther(segment, value) {
    for (let i in this.segments) {
      if (this.segments[i] !== segment) {
        this[this.segments[i]] = this[this.segments[i]].replace(value, "");
      }
    }
  }

  testMatch(testString) {
    const testArray = [...testString].sort();
    // un
    if (testArray.length == 2) {
      this.testPosibilities(["topRight", "bottomRight"], testArray);
    }
    // quatre
    if (testArray.length == 4) {
      this.testPosibilities(
        ["topLeft", "topRight", "middle", "bottomRight"],
        testArray
      );
    }
    // sept
    if (testArray.length == 3) {
      this.testPosibilities(["top", "topRight", "bottomRight"], testArray);
    }
    if (testArray.length == 5) {
      this.testPosibilities(["top", "middle", "bottom"], testArray);
    }
    // zero six neuf
    if (testArray.length == 6) {
      this.testPosibilities(
        ["top", "topLeft", "bottom", "bottomRight"],
        testArray
      );
    }
  }

  toNumber(input) {
    if (input.length == 2) return 1;
    if (input.length == 4) return 4;
    if (input.length == 3) return 7;
    if (input.length == 7) return 8;
    if (
      input.length == 5 &&
      input.match(this.topLeft) &&
      input.match(this.bottomRight)
    )
      return 5;
    if (
      input.length == 5 &&
      input.match(this.topRight) &&
      input.match(this.bottomLeft)
    )
      return 2;
    if (
      input.length == 5 &&
      input.match(this.topRight) &&
      input.match(this.bottomRight)
    )
      return 3;
    if (input.length == 6 && !input.match(this.middle)) return 0;
    if (input.length == 6 && !input.match(this.topRight)) return 6;
    if (input.length == 6 && !input.match(this.bottomLeft)) return 9;
  }
}

const dataTest =
  "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";
const parsedDataTest = dataTest.split(" | ");

function testLine(line) {
  const testSegment = new SevenSegment();
  const entry = line[0].split(" ");
  const output = line[1].split(" ");

  entry.forEach((val) => {
    testSegment.testMatch(val);
  });
  let total = "";
  output.forEach((val) => {
    total += testSegment.toNumber(val);
  });
  return Number(total);
}

function testLines(lines) {
  return lines.reduce((a, v) => (a += testLine(v)), 0);
}

console.time("test");
print(testLines(parsedData));
console.timeEnd("test");
