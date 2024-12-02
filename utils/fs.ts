import fs from "node:fs";
import path from "node:path";

export function readFile(dir: string, relativeFilePath: string) {
  return fs
    .readFileSync(path.resolve(path.join(dir, relativeFilePath)), {
      encoding: "utf8",
    })
    .trim();
}