const userSchema = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@desc   Register User
//@routes POST /api/users/register
//@access PRIVATE
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, picture } = req.user;
  const user = await userSchema.findOne({ email });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: req.user.token,
    });
  } else {
    const newUser = await new userSchema({
      email,
      name: email.split("@")[0],
      picture,
    }).save();

    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: req.user.token,
    });
  }
});

//@desc   check User
//@routes POST /api/users/isAdmin,isValid
//@access PRIVATE

const currentUser = asyncHandler(async (req, res) => {
  const { email } = req.user;
  userSchema.findOne({ email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
});

module.exports = { registerUser, currentUser };
