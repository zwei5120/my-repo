import typescript from "rollup-plugin-typescript2";
import common from "rollup-plugin-commonjs";
import NodePath from "path";
import autoprefixer from "autoprefixer";
import url from "rollup-plugin-url";
import RollupJson from "@rollup/plugin-json";
import RollupUrl from "@rollup/plugin-url";
import RollupBabel from "@rollup/plugin-babel";
import RollPostcss from "rollup-plugin-postcss";
import RollProgress from "rollup-plugin-progress";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import {
  nodeResolve
} from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'

console.info("EXPECTED EXTERNALS", [...Object.keys(pkg.peerDependencies || {})]);

const rollBabelConfig = {
  babelHelpers: "runtime",
  exclude: "node_modules/**",
};
const rollPostcssConfig = {
  inject: true,
  minimize: true,
  modules: true,
  plugins: [
    autoprefixer({
      remove: false,
    }),
  ],
};

export default [{
    input: "./src/index.ts",
    output: [{
        format: "cjs",
        dir: "dist/lib",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      }
    ],
    declaration: true,
    external: [...Object.keys(pkg.peerDependencies || {}), 'react', 'react/jsx-runtime'],
    plugins: [
      peerDepsExternal(),
      RollPostcss(rollPostcssConfig),
      url({
        url: "inline",
        limit: 1000,
        emitFiles: true,
      }),
      RollupUrl({
        fileName: "[dirname][hash][extname]",
        sourceDir: NodePath.join(__dirname, ".."),
      }),
      nodeResolve({
        extensions: ['.ts']
      }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      RollupBabel(rollBabelConfig),
      common({
        include: /\/node_modules\//,
      }),
      RollupJson(),
      RollProgress(),
    ],
  },
  {
    input: './src/index.ts',
    output: [{
      file: 'dist/lib/index.d.ts',
      format: 'cjs'
    }, {
      file: 'dist/index.d.ts',
      format: 'esm'
    }],
    plugins: [
      dts(),
      // del({
      //   hook: "buildEnd",
      //   targets: "./dist/dts"
      // }), //<------ New Addition
    ],
  },
]