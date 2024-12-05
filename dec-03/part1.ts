import { readFileByLine } from "../utils/fs";

const REGEX = /mul\((\d{1,3}),(\d{1,3})\)/g;

function sum(numbers: number[]) {
  return numbers.reduce((sum, num) => sum + num);
}

function sumOfLine(line: string) {
  return sum(
    Array.from(line.matchAll(REGEX)).map((match) => {
      return Number(match[1]) * Number(match[2]);
    }),
  );
}

const result = sum(readFileByLine(__dirname, "input.txt").map(sumOfLine));

console.log(result);
