import express from 'express';
import {
  createProduct,
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  addProductToCart,
} from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.route('/').get(getProducts).post(createProduct);
productRouter
  .route('/:id')
  .get(getProductByID)
  .put(updateProductByID)
  .delete(deleteProductByID);

productRouter.route('/cart/:id').get(addProductToCart);

export default productRouter;
