const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require("fs");

const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/node-mongo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// modal
const User = mongoose.model("User", userSchema);

// Middlewares

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware 1");
  console.log(req.headers);
  res.setHeader("x-Name", "Saquib");
  next();
});

// Routes
app.get("/users", async (req, res) => {
  const users = await User.find();

  const html = `
  ${users
    .map(
      (user) =>
        `<ul> <li>${user.firstName}</li> <li>${user.lastName}</li> </ul>`
    )
    .join("")}
  `;
  return res.send(html);
});

// rest api
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

// dynamic routing
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(user);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "nasar" });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.email ||
    !body.firstName ||
    !body.lastName ||
    !body.jobTitle ||
    !body.gender
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const result = await User.create(body);
  return res.status(201).json(result);
  f;
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
