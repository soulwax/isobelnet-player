// File: scripts/reset-version.js

const fs = require("fs");

let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
packageJson.version = "0.0.0";
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2) + "\n");
