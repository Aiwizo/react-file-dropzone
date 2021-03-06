import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

const extensions = [".js", ".jsx"];

export default [
  {
    input: "./src/index.jsx",
    output: {
      name: "FileDropzone",
      file: packageJson.main,
      format: "umd",
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
      terser(),
      peerDepsExternal(),
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
    ],
  },
  {
    input: "./src/index.jsx",
    output: {
      file: packageJson.module,
      format: "esm",
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
    ],
  },
];
