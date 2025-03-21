const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// mongoose connection
connectMongoDb("mongodb://127.0.0.1:27017/node-mongo").then(() =>
  console.log("Connected to MongoDB")
);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
