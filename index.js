const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
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
});

myServer.listen(8000, () => {
  console.log("server is listening");
});
