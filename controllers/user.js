const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { createTokenUser, attachCookiesToResponse } = require("../utils");
const { BadRequestError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ nHit: users.length, users });
};

const currentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getSingleUser = async (req, res) => {
  res.send("get a single user");
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }
  const { id: userId } = req.user.userId;
  const user = await User.findByIdAndUpdate(
    { _id: userId, email, name },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
module.exports = {
  getAllUsers,
  currentUser,
  getSingleUser,
  updateUser,
};
