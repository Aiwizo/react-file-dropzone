import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
const packageJson = require("./package.json");

const extensions = [".js", ".jsx"];

export default {
  input: "./src/index.jsx",
  output: {
    file: packageJson.main,
    format: "cjs",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
      "styled-components": "styled",
    },
    exports: "named",
  },
  external: [
    "react",
    "react-dom",
    /@babel\/runtime/,
    "styled-components",
    "@aiwizo/application-styles",
  ],
  plugins: [
    peerDepsExternal(),
    json(),
    replace({
      preventAssignment: true,
    }),
    babel({
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              esmodules: true,
            },
          },
        ],
        "@babel/preset-react",
      ],
      plugins: ["@babel/transform-runtime"],
      extensions,
      babelHelpers: "runtime",
    }),
    resolve({
      extensions,
    }),
    commonjs(),
  ],
};
