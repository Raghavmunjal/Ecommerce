import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { ErrorHandler, notFound } from "./middleware/errMiddleware.js";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(notFound);
app.use(ErrorHandler);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// connecting to the database
connectDB();

// listen on port
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Running ${process.env.NODE_ENV} mode on port 5000`)
);
