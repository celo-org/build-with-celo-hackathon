const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const json = require("@rollup/plugin-json")
const builtins = require("builtin-modules")

module.exports = {
  acorn: {
    allowReserved: true,
  },
  input: "autotasks/relay/index.js",
  output: {
    file: "build/relay/index.js",
    format: "cjs",
    exports: "auto",
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    json({ compact: true }),
  ],
  acorn: {
    allowReserved: true,
  },
  external: [
    ...builtins,
    "ethers",
    "web3",
    "axios",
    /^defender-relay-client(\/.*)?$/,
  ],
}
