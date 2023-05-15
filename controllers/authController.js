const bcrypt = require("bcrypt");
const { createUser, findUser, updateUser } = require("../services");
const { generateToken } = require("../utils");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = Number(process.env.SALT);

  // Cheacking if user unique
  const isUser = await findUser(email);
  if (isUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  // Hashing password
  const hashPassword = bcrypt.hashSync(password, salt, function (err) {
    return res.status(400).json({ message: err.message });
  });

  // Add new user in DB
  const user = await createUser({
    ...req.body,
    password: hashPassword,
  });
  if (!user) {
    return res.status(400).json({ message: "Can`t create user!" });
  }

  //Generate token and update user
  const token = generateToken({ id: user.id });
  user.token = token;

  const updateUserWithToken = await updateUser(user);
  if (!updateUserWithToken) {
    return res.status(400).json({ message: "Can`t save token" });
  }

  res.status(201).json({
    token: user.token,
    user: user.user,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Searching the user and compare the password
  const user = await findUser(email);
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!user || !comparePassword) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  //Generate token and update user
  const token = generateToken({ id: user.id });
  user.token = token;

  const updateUserWithToken = await updateUser(user);
  if (!updateUserWithToken) {
    return res.status(400).json({ message: "Can`t save token" });
  }

  res.status(200).json({
    token: user.token,
    user: user.user,
  });
};

module.exports = { registerUser, loginUser };
