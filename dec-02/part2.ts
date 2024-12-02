import { readFileByLine } from "../utils/fs";

function isReportIncreasing(report: number[]) {
  return report[1] - report[0] > 0;
}

function isBetween(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

function areLevelsSafe(level1: number, level2: number, isIncreasing: boolean) {
  const difference = level2 - level1;

  return (
    (isIncreasing ? difference > 0 : difference < 0) &&
    isBetween(Math.abs(difference), 1, 3)
  );
}

function getIndexOfFirstUnsafeLevel(report: number[]) {
  return report.findIndex((num, index) =>
    index === report.length - 1
      ? false
      : !areLevelsSafe(num, report[index + 1], isReportIncreasing(report)),
  );
}

function isSafeReport(report: number[]) {
  return report.reduce((isSafe, num, index) => {
    if (!isSafe || index === report.length - 1) {
      return isSafe;
    }

    return (
      isSafe &&
      areLevelsSafe(num, report[index + 1], isReportIncreasing(report))
    );
  }, true);
}

function isSafeReportWithProblemDampener(report: number[]) {
  const index = getIndexOfFirstUnsafeLevel(report);

  if (index < 0) {
    throw new Error("Operating on safe report");
  }

  console.log({
    report,
    index,
    dampenFirst: report.toSpliced(index, 1),
    dampenSecond: report.toSpliced(index + 1, 1),
    safeFirst: isSafeReport(report.toSpliced(index, 1)),
    safeSecond: isSafeReport(report.toSpliced(index + 1, 1)),
  });

  return (
    isSafeReport(report.toSpliced(index, 1)) ||
    isSafeReport(report.toSpliced(index + 1, 1))
  );
}

const totalSafeReports = readFileByLine(__dirname, "./input.txt")
  .map((line) => line.split(/\s+/).map(Number))
  .reduce(
    (count, report) =>
      isSafeReport(report) || isSafeReportWithProblemDampener(report)
        ? count + 1
        : count,
    0,
  );

console.log(totalSafeReports);
