var ghpages = require("gh-pages");

ghpages.publish(
  "dist",
  {
    branch: "master",
    dotfiles: true,
    repo: "https://github.com/asimashfaq/places-app.github.io.git",
    dest: "./",
    push: true
  },
  function(err) {
    console.log(err);
  }
);
