//@desc   Register User
//@routes POST /api/users
//@access PUBLIC
const registerUser = (req, res) => {
  console.log(req.body);
  res.json({ message: "Test Success😀😀" });
};

module.exports = { registerUser };
