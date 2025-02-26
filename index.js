const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from my World using Express");
});

app.get("/about", (req, res) => {
  res.send("want to know about me? i not telling you");
});

const myHandler = (req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `${Date.now()}: ${req.url} New req Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, date) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Hello World");
        break;
      case "/about":
        res.end("About Page");
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here is your search: " + search);
        break;
      default:
        res.end("404 Not Found");
    }
  });
};

// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log("server is listening");
// });

const fileExpress = require("./express");

fileExpress.run();
