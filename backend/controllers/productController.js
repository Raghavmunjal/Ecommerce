const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productSchema = require("../models/productModel");

//@desc   Create Product
//@routes POST /api/product
//@access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await new productSchema(req.body).save();
  res.status(201).json(newProduct);
});

//@desc   Get All Products
//@routes GET /api/product/all
//@access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;

  const page = Number(req.query.page) || 1;
  const category = req.query.category || "all";

  let products;
  let count;
  if (category !== "all") {
    count = await productSchema.countDocuments({ category });
    products = await productSchema
      .find({ category })
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  } else {
    count = await productSchema.countDocuments({});
    products = await productSchema
      .find({})
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc   Delete Product
//@routes DELETE /api/product/:slug
//@access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findOne({
    slug: req.params.slug,
  });
  if (product) {
    await product.remove();
    res.json({
      message: `Product ${req.params.slug} Deleted Successfully`,
    });
  } else {
    res.status(404);
    throw new Error(`Product ${req.params.slug} not found`);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
};
