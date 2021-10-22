const express = require("express");
const { registerUser } = require("../controllers/userController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", protect, registerUser);

module.exports = router;
