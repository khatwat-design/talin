/**
 * talin-hostinger-source.zip — كود المشروع للبناء على Hostinger (npm install && npm run build)
 * لا يضمّ node_modules ولا .next (أسرع وأصغر من ضغط المجلد كاملاً).
 */
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outName = "talin-hostinger-source.zip";
const outPath = path.join(root, outName);

const paths = [
  "package.json",
  "package-lock.json",
  "next.config.js",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "server.js",
  ".env.example",
  "HOSTINGER.md",
  "README.md",
  "src",
  "public",
  "data",
  "scripts",
];

const existing = paths.filter((p) => fs.existsSync(path.join(root, p)));
if (existing.length === 0) {
  console.error("Nothing to zip.");
  process.exit(1);
}

if (fs.existsSync(outPath)) {
  fs.unlinkSync(outPath);
}

const quoted = existing.map((p) => JSON.stringify(p)).join(" ");
const cmd = `cd ${JSON.stringify(root)} && zip -r ${JSON.stringify(outName)} ${quoted}`;

execSync(cmd, { stdio: "inherit" });
console.log(`\nCreated: ${outPath}`);
console.log("On Hostinger: npm install && npm run build && npm start");
