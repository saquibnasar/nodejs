const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.json(users);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.json(user);
};

const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
};

const handleUpdateUserById = async (req, res) => {
  const changedData = await User.findByIdAndUpdate(req.params.id, {
    lastName: "Changed",
  });
  console.log(changedData);

  return res.json({ status: "Success" });
};

const handleCreateUser = async (req, res) => {
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
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
  handleUpdateUserById,
};
