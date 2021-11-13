const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const UserRoutes = require("./routes/userRoute.js");
const CategoryRoutes = require("./routes/categoryRoute.js");
const SubCategoryRoutes = require("./routes/subCategoryRoute.js");
const ProductRoutes = require("./routes/productRoute.js");
const BrandRoutes = require("./routes/brandRoute");
const UploadRoutes = require("./routes/uploadRoute");
const CartRoutes = require("./routes/cartRoutes");
const { ErrorHandler, notFound } = require("./middleware/errMiddleware.js");

const app = express();
dotenv.config();

// middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/users", UserRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/subcategory", SubCategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/brand", BrandRoutes);
app.use("/api/images", UploadRoutes);
app.use("/api/cart", CartRoutes);

// connecting to the database
connectDB();

// error handler
app.use(notFound);
app.use(ErrorHandler);

// listen on port
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Running ${process.env.NODE_ENV} mode on port 5000`)
);
