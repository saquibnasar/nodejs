const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from my World using Express");
});

app.get("/about", (req, res) => {
  res.send("want to know about me? i not telling you");
});

module.exports.run = function () {
  app.listen(8000, () => {
    console.log("server is listening");
  });
};
