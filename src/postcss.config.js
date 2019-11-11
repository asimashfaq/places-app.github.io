const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    require("postcss-import"),
    tailwindcss("configs/tailwind.config.js"),
    require("autoprefixer")
  ]
};
