const express = require("express");
const app = express();
const portNumber = 3000;
const sourceDir = "dist";
const expressStaticGzip = require("express-static-gzip");
app.use(
  "/",
  expressStaticGzip(sourceDir, {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function(res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    }
  })
);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
