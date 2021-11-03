const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  getSortedProducts,
  createProductReview,
} = require("../controllers/productController");
const router = express.Router();

router.route("/all").get(getAllProducts).post(getSortedProducts);
router.route("/:id/reviews").post(tokenCheck, createProductReview);
router
  .route("/:slug")
  .get(getProduct)
  .delete(tokenCheck, adminCheck, deleteProduct)
  .put(tokenCheck, adminCheck, updateProduct);
router.route("/").post(tokenCheck, adminCheck, createProduct);

module.exports = router;
