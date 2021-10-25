const express = require("express");
const { registerUser, currentUser } = require("../controllers/userController");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(tokenCheck, registerUser);
router.route("/isValid").post(tokenCheck, currentUser);
router.route("/isAdmin").post(tokenCheck, adminCheck, currentUser);

module.exports = router;
