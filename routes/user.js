const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
  handleUpdateUserById,
} = require("../controllers/user");

const router = express.Router();
// rest api
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

// dynamic routing
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

// router.get("/users", async (req, res) => {
//   const users = await User.find();

//   const html = `
//   ${users
//     .map(
//       (user) =>
//         `<ul> <li>${user.firstName}</li> <li>${user.lastName}</li> </ul>`
//     )
//     .join("")}
//   `;
//   return res.send(html);
// });
