// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// module.exports = function (webpackEnv) {
//   plugins: [
//     new NodePolyfillPlugin()
//   ]
//   // return {
//   //   resolve: {
//   //     fallback: { // not present by default
//   //       path: require.resolve("path-browserify"),
//   //       crypto: require.resolve("crypto-browserify"),
//   //       // "crypto": false,
//   //       // "stream": false

//   //     }
//   //   }
//   // }
// }

module.exports = {
  target: 'node'
}