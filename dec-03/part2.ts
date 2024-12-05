import { readFileByLine } from "../utils/fs";

const REGEX = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

let enabled = true;

function sum(numbers: number[]) {
  return numbers.reduce((sum, num) => sum + num);
}

function sumOfLine(line: string) {
  const filteredMatches = Array.from(line.matchAll(REGEX)).filter((match) => {
    if (match[0] === "do()") {
      enabled = true;
      return false;
    }

    if (match[0] === "don't()") {
      enabled = false;
      return false;
    }

    return enabled;
  }, 0);

  return sum(
    filteredMatches.map((match) => {
      return Number(match[1]) * Number(match[2]);
    }),
  );
}

const result = sum(readFileByLine(__dirname, "input.txt").map(sumOfLine));

console.log(result);
