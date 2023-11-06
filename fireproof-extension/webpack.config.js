const path = require("path");

module.exports = {
  entry: "./clean-content-script.js",
  output: {
    filename: "content-script.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
