import { readFile } from "../utils/fs";

const [listA, listB] = readFile(__dirname, "./input.txt")
  .split("\n")
  .reduce<[number[], number[]]>(
    ([listA, listB], line) => {
      const [a, b] = line.split(/\s+/);

      return [
        [...listA, Number(a)],
        [...listB, Number(b)],
      ];
    },
    [[], []],
  )
  .map((list) => list.toSorted());

const totalDistance = listA.reduce((sum, locationId, index) => {
  return sum + Math.abs(locationId - listB[index]);
}, 0);

console.log(totalDistance);
