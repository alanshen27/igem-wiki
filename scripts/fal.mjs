/**
 * Shared Fal helpers for the art scripts. HTTP goes through curl (Node fetch
 * is DNS-blocked in some sandboxes). Reads FAL_API_KEY from .env; the key goes
 * into a curl config file, never argv.
 */
import { readFile, writeFile, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import os from "node:os";

const exec = promisify(execFile);
export const ROOT = path.resolve(import.meta.dirname, "..");
export const OUT = path.join(ROOT, "public", "art", "gen");
export const REVIEW = path.join(OUT, "review");

const CURLRC = path.join(os.tmpdir(), `._aura-curlrc.${process.pid}`);
const BODY = path.join(os.tmpdir(), `._aura-fal-body.${process.pid}`);

const envText = await readFile(path.join(ROOT, ".env"), "utf8");
const KEY = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
).FAL_API_KEY;

if (!KEY) {
  console.error("Missing FAL_API_KEY");
  process.exit(1);
}

await writeFile(CURLRC, `header = "Authorization: Key ${KEY}"\n`);

function curlJson(args) {
  return exec("curl", ["-sS", "-K", CURLRC, ...args], { maxBuffer: 40 * 1024 * 1024 }).then(({ stdout }) =>
    stdout ? JSON.parse(stdout) : {},
  );
}

let seq = 0;
async function falPost(model, input) {
  const body = `${BODY}.${seq++}`;
  await writeFile(body, JSON.stringify(input));
  try {
    return await curlJson(["-X", "POST", `https://queue.fal.run/${model}`, "-H", "Content-Type: application/json", "--data-binary", `@${body}`]);
  } finally {
    await unlink(body).catch(() => {});
  }
}

export async function falRun(model, input, { tries = 120, wait = 2500 } = {}) {
  const submitted = await falPost(model, input);
  if (!submitted.request_id) throw new Error(`${model} submit failed: ${JSON.stringify(submitted).slice(0, 300)}`);
  const statusUrl = submitted.status_url ?? `https://queue.fal.run/${model}/requests/${submitted.request_id}/status`;
  const resultUrl = submitted.response_url ?? `https://queue.fal.run/${model}/requests/${submitted.request_id}`;
  for (let i = 0; i < tries; i++) {
    const data = await curlJson([statusUrl]);
    if (data.status === "COMPLETED") return curlJson([resultUrl]);
    if (data.status === "FAILED") throw new Error(`${model} failed: ${JSON.stringify(data).slice(0, 400)}`);
    await new Promise((r) => setTimeout(r, wait));
  }
  throw new Error(`${model} timed out`);
}

export async function download(url, dest) {
  await exec("curl", ["-sS", "-L", "-o", dest, url]);
}

/** Normalise to PNG and cap the longest side. */
export async function toPng(file, maxPx = 640) {
  try {
    await exec("sips", ["-s", "format", "png", "-Z", String(maxPx), file, "--out", file]);
  } catch {
    /* sips missing */
  }
}

export async function uploadToFal(file, contentType) {
  const init = await curlJson([
    "-X", "POST",
    "https://rest.alpha.fal.ai/storage/upload/initiate?storage_type=fal-cdn-v3",
    "-H", "Content-Type: application/json",
    "--data-binary", JSON.stringify({ content_type: contentType, file_name: path.basename(file) }),
  ]);
  if (!init.upload_url || !init.file_url) throw new Error(`upload initiate failed: ${JSON.stringify(init).slice(0, 300)}`);
  await exec("curl", ["-sS", "-X", "PUT", "-H", `Content-Type: ${contentType}`, "--data-binary", `@${file}`, init.upload_url]);
  return init.file_url;
}

/** Recraft still → rembg cutout → local PNG. */
export async function stillCutout({ prompt, style, styleId, dest, size = "square_hd", colors, maxPx }) {
  const input = { prompt, image_size: size };
  if (colors) input.colors = colors;
  if (styleId) input.style_id = styleId;
  else input.style = style;
  const still = await falRun("fal-ai/recraft-v3", input);
  const url = still.images?.[0]?.url;
  if (!url) throw new Error(`no image: ${JSON.stringify(still).slice(0, 200)}`);
  const cut = await falRun("fal-ai/imageutils/rembg", { image_url: url }, { tries: 60, wait: 2000 });
  const cutUrl = cut.image?.url;
  if (!cutUrl) throw new Error("no cutout");
  await download(cutUrl, dest);
  await toPng(dest, maxPx);
  return { dest, url, cutUrl };
}

/** RGB of one pixel (default: near the top-left corner) as a 6-hex string. */
export async function sampleColor(src, x = 3, y = 3, frame = 0) {
  const { stdout } = await exec(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-i", src, "-vf", `select='eq(n\\,${frame})',format=rgb24,crop=w=1:h=1:x=${x}:y=${y}`, "-vsync", "vfr", "-frames:v", "1", "-f", "rawvideo", "-"],
    { encoding: "buffer" },
  );
  return [...stdout.subarray(0, 3)].map((c) => c.toString(16).padStart(2, "0")).join("");
}

/**
 * Green-screen key as an ffmpeg filter string. The models never paint the exact
 * green asked for, so key on the sampled colour with RGB distance (`colorkey`);
 * `chromakey` compares chroma only and eats the low-saturation cocoa outlines.
 */
export function keyFilter(key, { similarity = 0.14, blend = 0.12 } = {}) {
  return `format=rgba,colorkey=0x${key}:${similarity}:${blend},despill=type=green:mix=0.5:expand=0,format=rgba`;
}

/** Still on green → transparent PNG. */
export async function keyOut(src, dest, opts) {
  const key = await sampleColor(src);
  await exec("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", src, "-vf", keyFilter(key, opts), "-frames:v", "1", dest]);
  return key;
}

export async function cleanup() {
  await unlink(CURLRC).catch(() => {});
}
