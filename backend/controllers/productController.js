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
  const products = await productSchema.find({}).sort({ createdAt: -1 }).exec();
  res.json(products);
});

module.exports = {
  createProduct,
  getAllProducts,
};
