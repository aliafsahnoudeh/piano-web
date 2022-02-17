const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "piano-web.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "umd",
      name: "piano-web",
    },
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
};
