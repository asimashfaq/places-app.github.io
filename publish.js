var ghpages = require("gh-pages");

ghpages.publish(
  "dist",
  {
    branch: "master",
    dotfiles: true,
    repo: "https://asimashfaq.github.io/places-app.github.io",
    dest: "./",
    push: true
  },
  function(err) {
    console.log(err);
  }
);
