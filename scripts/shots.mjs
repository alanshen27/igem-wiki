/**
 * Local capture helper: screenshots the homepage at several scroll offsets.
 *   node scripts/shots.mjs [baseUrl]
 * Output: scripts/shots/*.png (gitignored)
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const out = path.resolve(import.meta.dirname, "shots");
await mkdir(out, { recursive: true });

const browser = await chromium.launch();

async function run(name, viewport, offsets) {
  const page = await browser.newPage({ viewport });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const info = await page.evaluate(() => {
    const v = document.querySelector("video");
    return { src: v?.currentSrc, ready: v?.readyState, dur: v?.duration, err: v?.error?.code ?? null };
  });
  console.log(name, JSON.stringify(info));
  for (const o of offsets) {
    const y = Math.round(o * viewport.height);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(450);
    const t = await page.evaluate(() => document.querySelector("video")?.currentTime ?? null);
    await page.screenshot({ path: path.join(out, `${name}-${o.toFixed(2)}vh.png`) });
    console.log(`  ${o.toFixed(2)}vh scrollY=${y} videoTime=${t}`);
  }
  await page.close();
}

await run("desktop", { width: 1440, height: 900 }, [0, 0.4, 0.8, 1.1, 1.4, 1.9, 2.6, 3.3, 4.0]);
await run("mobile", { width: 390, height: 844 }, [0, 0.6, 1.2, 1.7, 2.4, 3.2]);

await browser.close();
