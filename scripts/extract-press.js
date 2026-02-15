#!/usr/bin/env node
/**
 * Extracts article content from an image (OCR) or URL and outputs a PressEntry JSON.
 * Usage:
 *   node scripts/extract-press.js <image-path>   e.g. node scripts/extract-press.js public/press/article.jpg
 *   node scripts/extract-press.js <url>          e.g. node scripts/extract-press.js https://example.com/article
 *
 * Output: JSON object for lib/press.ts. Review and edit before adding.
 */

const fs = require("fs");
const path = require("path");

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/extract-press.js <image-path|url>");
  console.error("  Image: node scripts/extract-press.js public/press/article.jpg");
  console.error("  URL:   node scripts/extract-press.js https://example.com/article");
  process.exit(1);
}

const isUrl = input.startsWith("http://") || input.startsWith("https://");

function truncateToWords(text, maxWords) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

async function extractFromImage(imagePath) {
  try {
    const Tesseract = require("tesseract.js");
    const fullPath = path.isAbsolute(imagePath) ? imagePath : path.join(process.cwd(), imagePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Image not found: ${fullPath}`);
    }
    const { data } = await Tesseract.recognize(fullPath, "eng");
    const text = data.text.trim();
    if (!text) {
      throw new Error("No text extracted from image. Check image quality.");
    }
    const words = text.split(/\s+/);
    const excerpt = truncateToWords(text, 100);
    const id = path.basename(imagePath, path.extname(imagePath)).replace(/\s+/g, "-").toLowerCase();
    const publicDir = path.join(process.cwd(), "public");
    const publicPath =
      fullPath.startsWith(publicDir) ?
        "/" + path.relative(publicDir, fullPath).replace(/\\/g, "/") :
        "/press/" + path.basename(imagePath);
    return {
      id: `${id}-${Date.now().toString(36)}`,
      publication: "(extracted or add manually)",
      headline: "(first line or add manually)",
      date: new Date().getFullYear().toString(),
      image: publicPath.startsWith("/") ? publicPath : `/${publicPath}`,
      excerpt,
      fullText: text,
      url: undefined,
    };
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND" && err.message.includes("tesseract")) {
      console.error("Tesseract.js not installed. Run: npm install tesseract.js");
      process.exit(1);
    }
    throw err;
  }
}

async function extractFromUrl(url) {
  try {
    const cheerio = require("cheerio");
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const title = $("h1").first().text().trim() || $("title").text().trim() || "(add manually)";
    const article =
      $("article p").length > 0
        ? $("article p")
            .map((_, el) => $(el).text())
            .get()
            .join("\n\n")
        : $("p")
            .slice(0, 10)
            .map((_, el) => $(el).text())
            .get()
            .join("\n\n");
    const text = article.trim() || $("body").text().trim().slice(0, 3000);
    const excerpt = truncateToWords(text, 100);
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    const id = hostname.split(".")[0] + "-" + Date.now().toString(36);
    return {
      id,
      publication: hostname,
      headline: title,
      date: new Date().getFullYear().toString(),
      image: undefined,
      excerpt,
      fullText: text,
      url,
    };
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND" && err.message.includes("cheerio")) {
      console.error("Cheerio not installed. Run: npm install cheerio");
      process.exit(1);
    }
    throw err;
  }
}

async function main() {
  let result;
  if (isUrl) {
    result = await extractFromUrl(input);
  } else {
    result = await extractFromImage(input);
  }
  console.log(JSON.stringify(result, null, 2));
  console.error("\n--- Review the output above, edit as needed, then add to lib/press.ts ---");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
