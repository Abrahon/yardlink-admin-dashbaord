import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, "../src/components/ui");
const output = path.join(dir, "index.ts");

const files = fs
  .readdirSync(dir)
  .filter((file) => file !== "index.ts" && file.endsWith(".tsx"));

const exports = files
  .map((file) => {
    const name = file.replace(".tsx", "");
    return `export * from './${name}';`;
  })
  .join("\n");

fs.writeFileSync(output, exports);

console.log("✅ UI exports generated!");