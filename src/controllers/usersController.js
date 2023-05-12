const { fetchUsers, updateUser } = require("../services");

const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(502).json({ message: error.measage });
  }
};

const changeUser = async (req, res) => {
  const data = req.body;
  try {
    const updatedUser = await updateUser(data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(502).json({ message: error.measage });
  }
};

module.exports = {
  getUsers,
  changeUser,
};
