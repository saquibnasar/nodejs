const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middlewares

app.use(express.urlencoded({ extended: false }));
// Routes
app.get("/users", (req, res) => {
  const html = `
  ${users
    .map(
      (user) =>
        `<ul> <li>${user.first_name}</li> <li>${user.last_name}</li> </ul>`
    )
    .join("")}
  `;
  return res.send(html);
});

// rest api
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// dynamic routing
app
  .route("api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    console.log(user);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
