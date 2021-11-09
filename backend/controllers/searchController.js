const asyncHandler = require("express-async-handler");
const productSchema = require("../models/productModel");
const userSchema = require("../models/userModel");
const categorySchema = require("../models/categoryModel");
const subCategorySchema = require("../models/subCategoryModel");
const brandSchema = require("../models/brandModel");

const handleQuery = asyncHandler(async (req, res, query) => {
  const searchTitle = query
    ? {
        title: { $regex: query, $options: "i" },
      }
    : {};

  const searchDesc = query
    ? {
        description: { $regex: query, $options: "i" },
      }
    : {};

  const productsTitle = await productSchema
    .find({ ...searchTitle })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();

  const productsDesc = await productSchema
    .find({ ...searchDesc })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();

  let products = [];
  let productSet = new Set();
  if (productsTitle.length > 0) {
    productsTitle.forEach((p) => productSet.add(p._id.toString()));
  }
  if (productsDesc.length > 0) {
    productsDesc.forEach((p) => {
      productSet.add(p._id.toString());
    });
  }
  for (let item of productSet.keys()) {
    const result = await productSchema.findById({ _id: item });
    products.push(result);
  }

  return products;
});

const handlePrice = asyncHandler(async (req, res, price) => {
  let products = await productSchema
    .find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

//@desc    Get products by brands
//@routes  POST /api/product/search/filters
//@access  PUBLIC
const searchProducts = asyncHandler(async (req, res) => {
  const { query, price } = req.body;

  let productsId = [];
  let queryId = [];
  let priceId = [];
  let products = [];
  const keyword = query ? query : "";
  const queryProducts = await handleQuery(req, res, keyword);

  queryProducts.forEach((p) => queryId.push(p._id.toString()));

  if (price !== undefined) {
    if (price[0] === 0 && price[1] === 0) {
      price[0] = 0;
      price[1] = 99999;
    }
    const priceProducts = await handlePrice(req, res, price);

    priceProducts.forEach((p) => priceId.push(p._id.toString()));
  }

  productsId.push(queryId);

  productsId.push(priceId);

  let finalProductId =
    productsId.length > 0
      ? productsId.shift().filter((v) => {
          return productsId.every((a) => {
            return a.indexOf(v) !== -1;
          });
        })
      : [];

  if (finalProductId.length > 0) {
    for (let item of finalProductId) {
      const result = await productSchema.findById({ _id: item });
      products.push(result);
    }
  }

  res.json(products);
});

module.exports = { searchProducts };
