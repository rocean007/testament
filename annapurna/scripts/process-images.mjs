import sharp from "sharp";
import { mkdirSync } from "fs";

const ASSETS = "assets";
const PUBLIC = "public";
const APP = "app";

mkdirSync(PUBLIC, { recursive: true });

async function run() {
  // Logo: source is a clean 200x200 JPEG, keep as-is for public/logo.jpg
  await sharp(`${ASSETS}/aspl.jpg`).jpeg({ quality: 90 }).toFile(`${PUBLIC}/logo.jpg`);

  // App Router favicon convention: square icon + 180x180 apple touch icon,
  // both regenerated from the real logo (not the oversized/wrong favicon.png)
  await sharp(`${ASSETS}/aspl.jpg`).resize(32, 32).png().toFile(`${APP}/icon.png`);
  await sharp(`${ASSETS}/aspl.jpg`).resize(180, 180).png().toFile(`${APP}/apple-icon.png`);

  // Welcome-animation plane image: source is 769x300 (2.563:1), keep native
  // aspect ratio instead of the old hardcoded 250x250 square that distorted it
  await sharp(`${ASSETS}/image.png`).png({ quality: 90 }).toFile(`${PUBLIC}/plane.png`);

  // Fixed background: source is actually AVIF content mislabeled .webp.
  // Re-export as real WEBP, resized for a full-viewport low-opacity backdrop.
  await sharp(`${ASSETS}/that.webp`)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 58 })
    .toFile(`${PUBLIC}/background.webp`);

  console.log("Image processing complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
