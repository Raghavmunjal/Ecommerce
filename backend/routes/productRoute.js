const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");
const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/").post(tokenCheck, adminCheck, createProduct);

module.exports = router;
