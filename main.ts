// Fortune Cookie Wisdom for Developers
// Writes a single original fortune-cookie line for a software developer
// to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall-clock time.

// The line. Chosen over candidates about a 3 a.m. bug fix the coder
// cannot remember ("the code will remember for you") and an estimate
// becoming tomorrow's apology: this one is the most fortune-cookie-like
// — one short balanced sentence, a truth every developer knows (code
// written late at night reads like a stranger's by morning), and a quiet
// double meaning that rewards a second read: the stranger is you, so
// "be kind to strangers" is really "be kind to past-you".
const LINE =
  "The code you wrote at midnight will read like a stranger's by morning; be kind to strangers.";

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Enforce the gate ourselves: UTF-8 text, 1-120 characters, not only
// whitespace, a single line.
if (
  LINE.length < 1 ||
  LINE.length > 120 ||
  LINE.trim().length === 0 ||
  /\n/.test(LINE)
) {
  throw new Error(`line fails gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back self-check: what we wrote must be exactly the line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from LINE");
}

console.log(`entry: ${LINE.length} chars — gate OK`);
