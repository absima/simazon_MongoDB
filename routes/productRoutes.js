import express from "express";
import {
  getProducts,
  getProductByID,
  addProductToCart,
  createProduct,
  deleteProductByID,
} from "../controllers/productControllers.js";

import { requireAdminKey } from "../middleware/adminkey.js";

const productRouter = express.Router();

// GET all products
// POST create product (protected)
productRouter
  .route("/")
  .get(getProducts)
  .post(requireAdminKey, createProduct);

// GET product by id
// DELETE product by id (protected)
productRouter
  .route("/:id")
  .get(getProductByID)
  .delete(requireAdminKey, deleteProductByID);

// Cart route
productRouter
  .route("/cart/:id")
  .get(addProductToCart);

export default productRouter;


// import express from "express";
// import {
//   getProducts,
//   getProductByID,
//   addProductToCart,
//   createProduct,
// } from "../controllers/productControllers.js";

// import { requireAdminKey } from "../middleware/adminKey.js";

// const productRouter = express.Router();

// // GET all products
// // POST create product (protected)
// productRouter
//   .route("/")
//   .get(getProducts)
//   .post(requireAdminKey, createProduct);

// // GET product by id
// productRouter
//   .route("/:id")
//   .get(getProductByID);

// // Cart route (unchanged)
// productRouter
//   .route("/cart/:id")
//   .get(addProductToCart);

// export default productRouter;

