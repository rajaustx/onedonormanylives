#!/usr/bin/env node
/**
 * Downloads appreciation data from Google Sheets and saves to data/appreciation_kidney_donation.csv
 * Runs automatically before dev and build.
 */

const fs = require("fs");
const path = require("path");

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqWH9--dRvWiOpeYLKQpHBoTTQnEcJn25LpCBcLmxlUfjscDEKaZtrqH-4vl0LcdWR5kKxlDTsvkOK/pub?output=csv";
const OUTPUT_PATH = path.join(process.cwd(), "data", "appreciation_kidney_donation.csv");

async function download() {
  const res = await fetch(CSV_URL, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to download: HTTP ${res.status}`);
  }
  const content = await res.text();
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_PATH, content, "utf-8");
  console.log("✓ Downloaded appreciation data to data/appreciation_kidney_donation.csv");
}

download().catch((err) => {
  console.error("Failed to download appreciation CSV:", err.message);
  process.exit(1);
});
