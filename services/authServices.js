const axios = require("axios");
require("dotenv").config();

axios.defaults.baseURL = process.env.DB_HOST;

const createUser = async (user) => {
  try {
    const response = await axios.post("/users", user);
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};
