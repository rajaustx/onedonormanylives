#!/usr/bin/env node
/**
 * Downloads pledges data from Google Sheets and saves to data/pledges.csv
 * Runs automatically before dev and build.
 * Refuses to overwrite if downloaded body is suspiciously small (< 200 bytes).
 */

const fs = require("fs");
const path = require("path");

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAihtjKpvb-DodZa9KWZ3GF86Wd6xgT8EQOUoFg-gQ2f01Ddl1mk-5jvChYYVmiSBLXpTarfQPDjRu/pub?output=csv";
const OUTPUT_PATH = path.join(process.cwd(), "data", "pledges.csv");
const MIN_BYTES = 200;

async function download() {
  const res = await fetch(CSV_URL, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to download pledges: HTTP ${res.status}`);
  }
  const content = await res.text();
  const byteLength = Buffer.byteLength(content, "utf-8");

  if (byteLength < MIN_BYTES) {
    console.warn(
      `Pledges: Refusing to overwrite (${byteLength} bytes < ${MIN_BYTES}). Keeping existing file.`
    );
    return;
  }

  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_PATH, content, "utf-8");
  console.log(`✓ Downloaded pledges data to data/pledges.csv (${byteLength} bytes)`);
}

download().catch((err) => {
  console.error("Failed to download pledges CSV:", err.message);
  process.exit(1);
});
