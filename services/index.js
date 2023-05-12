const { createUser } = require("./authServices");
const { fetchUsers, findUser, updateUser } = require("./userServices");

module.exports = {
  createUser,
  fetchUsers,
  findUser,
  updateUser,
};
