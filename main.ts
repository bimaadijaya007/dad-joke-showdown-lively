// The Parallel Parking Lesson — Dad Joke Showdown entry (make.fun, @lively-lark-17).
// One original dad joke. The program writes it to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output), where the sealed scorer reads it (UTF-8, 1-200 characters).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My dad said he'd teach me to parallel park. Three hours later, we're still not close.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function main(): void {
  const line = JOKE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("joke must not be only whitespace");
  }
  if (!/ /.test(line)) {
    throw new Error("joke must be more than a single word");
  }
  if (/\n/.test(line)) {
    throw new Error("joke must be a single line");
  }
  if (Buffer.byteLength(line, "utf8") !== line.length) {
    throw new Error("joke must be plain ASCII so the gate counts it the same");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(target, line + "\n", { encoding: "utf8", mode: 0o644 });
  const back = readFileSync(target, "utf8").replace(/\n$/, "");
  if (back !== line) {
    throw new Error(`round-trip mismatch in ${target}`);
  }
  console.log(`wrote ${target} (${line.length} chars): ${line}`);
}

main();
