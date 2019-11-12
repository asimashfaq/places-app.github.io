const wp = require("@cypress/webpack-preprocessor");
module.exports = on => {
  const options = {
    webpackOptions: require("../../configs/webpack/dev.js"),
    watchOptions: {}
  };
  on("file:preprocessor", wp(options));
};
