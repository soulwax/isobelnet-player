import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import replace from "rollup-plugin-re";

const config = {
  input: "src/index.ts",
  external: ["ws"],
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
    chunkFileNames: "[name].js",
  },
  plugins: [
    typescript(),
    nodeResolve({
      preferBuiltins: true,
    }),
    // Fix for formidable require reassignment
    replace({
      patterns: [
        {
          match: /formidable(\/|\\)lib/,
          test: "if (global.GENTLY) require = GENTLY.hijack(require);",
          replace: "",
        },
      ],
    }),
    commonjs(),
    json(),
    // Terser disabled due to issues with WebSocket module
    // terser()
  ],
};

export default config;
