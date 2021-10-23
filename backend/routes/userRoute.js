const express = require("express");
const { registerUser, currentUser } = require("../controllers/userController");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", tokenCheck, registerUser);
router.post("/isValid", tokenCheck, currentUser);
router.post("/isAdmin", tokenCheck, adminCheck, currentUser);

module.exports = router;
