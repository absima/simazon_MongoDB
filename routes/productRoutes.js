import express from 'express';
import {
  getAllProducts,
  createOneProduct,
  getOneProductByID,
  updateOneProduct,
  removeOneProductById,
  addOneProductToCart,
} from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createOneProduct);
productRouter
  .route('/:id')
  .get(getOneProductByID)
  .put(updateOneProduct)
  .delete(removeOneProductById);

productRouter.route('/cart/:id').get(addOneProductToCart);

export default productRouter;
