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
  console.log(req.query.pageNumber, req.query.category, req.query.limit);
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category || "all";
  const pageSize = Number(req.query.limit) || 6;

  let products;
  let count;
  if (category !== "all") {
    count = await productSchema.countDocuments({ category });
    products = await productSchema
      .find({ category })
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  } else {
    count = await productSchema.countDocuments({});
    products = await productSchema
      .find({})
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }
  console.log(products.length);
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

//@desc   Get Product
//@routes GET /api/product/:slug
//@access PUBLIC
const getProduct = asyncHandler(async (req, res) => {
  const product = await productSchema
    .findOne({
      slug: req.params.slug,
    })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .exec();
  res.json(product);
});

//@desc   Update Product
//@routes PUT /api/product/:slug
//@access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updatedProduct = await productSchema
    .findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
    .exec();
  res.json(updatedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};
