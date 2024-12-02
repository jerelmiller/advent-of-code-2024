import { readFileByLine } from "../utils/fs";

const [listA, listBByOccurance] = readFileByLine(
  __dirname,
  "./input.txt",
).reduce<[number[], Map<number, number>]>(
  ([listA, listB], line) => {
    const [a, b] = line.split(/\s+/).map(Number);
    const occurance = listB.get(b) ?? 0;

    return [[...listA, a], listB.set(b, occurance + 1)];
  },
  [[], new Map()],
);

const similarityScore = listA.reduce((sum, locationId) => {
  return sum + locationId * (listBByOccurance.get(locationId) ?? 0);
}, 0);

console.log(similarityScore);
