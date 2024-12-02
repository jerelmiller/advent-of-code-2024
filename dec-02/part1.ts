import { readFileByLine } from "../utils/fs";

function isBetween(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

function isSafeReport(report: number[]) {
  const isIncreasing = report[1] - report[0] > 0;
  const differences = report.reduce<number[]>(
    (diffs, num, index) =>
      index === report.length - 1 ? diffs : [...diffs, report[index + 1] - num],
    [],
  );

  return differences.every((difference) => {
    return (
      (isIncreasing ? difference > 0 : difference < 0) &&
      isBetween(Math.abs(difference), 1, 3)
    );
  });
}

const totalSafeReports = readFileByLine(__dirname, "./input.txt")
  .map((line) => line.split(/\s+/).map(Number))
  .reduce((count, report) => (isSafeReport(report) ? count + 1 : count), 0);

console.log(totalSafeReports);
