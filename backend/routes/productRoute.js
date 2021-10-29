const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/all").get(getAllProducts);
router
  .route("/:slug")
  .get(getProduct)
  .delete(tokenCheck, adminCheck, deleteProduct)
  .put(tokenCheck, adminCheck, updateProduct);
router.route("/").post(tokenCheck, adminCheck, createProduct);

module.exports = router;
