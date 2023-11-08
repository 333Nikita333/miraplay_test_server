const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email already in use");
  }

  const hashPawword = await bcrypt.hash(password, 10);
  const payload = {
    id: nanoid(),
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const newUser = await User.create({
    ...req.body,
    password: hashPawword,
    token,
  });

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
