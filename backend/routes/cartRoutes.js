const express = require("express");
const { tokenCheck } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  saveUserCartItems,
  getUserCartItems,
  deleteUserCartItems,
  saveUserShippingAddress,
} = require("../controllers/cartController");

router.route("/address").post(tokenCheck, saveUserShippingAddress);
router
  .route("/")
  .post(tokenCheck, saveUserCartItems)
  .get(tokenCheck, getUserCartItems)
  .delete(tokenCheck, deleteUserCartItems);
module.exports = router;
