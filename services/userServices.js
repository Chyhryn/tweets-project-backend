const axios = require("axios");
require("dotenv").config();

axios.defaults.baseURL = process.env.DB_HOST;

const fetchUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (value) => {
  try {
    const users = await fetchUsers();
    return users.find((obj) => Object.values(obj).includes(value));
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    const response = await axios.put(`/users/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchUsers,
  findUser,
  updateUser,
};
