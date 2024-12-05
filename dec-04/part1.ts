import { readFileByLine } from "../utils/fs";

type Coordinates = [line: number, column: number];

const SEARCH = "XMAS";
const DIRECTION: Record<string, Coordinates> = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
  UP_LEFT: [-1, -1],
  UP_RIGHT: [-1, 1],
  DOWN_LEFT: [1, -1],
  DOWN_RIGHT: [1, 1],
};

const matrix = readFileByLine(__dirname, "input.txt").map((line) =>
  line.split(""),
);

function getLetterAtCoordinate([line, column]: Coordinates) {
  return matrix[line]?.[column];
}

function testDirection([line, column]: Coordinates, [x, y]: Coordinates) {
  for (let i = 0; i < SEARCH.length; i++) {
    if (SEARCH[i] !== getLetterAtCoordinate([line + x * i, column + y * i])) {
      return false;
    }
  }

  return true;
}

function getXmasCount(coordinates: Coordinates) {
  return Object.values(DIRECTION).reduce((count, direction) => {
    return testDirection(coordinates, direction) ? count + 1 : count;
  }, 0);
}

const count = matrix.reduce((count, line, i) => {
  return (
    count +
    line.reduce((lineCount, _, j) => lineCount + getXmasCount([i, j]), 0)
  );
}, 0);

console.log(count);
