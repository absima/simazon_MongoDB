import express from 'express';
import {
  getAllProducts,
  createOneProduct,
  getOneProductByID,
  updateOneProduct,
  removeOneProductById,
} from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createOneProduct);
productRouter
  .route('/:id')
  .get(getOneProductByID)
  .put(updateOneProduct)
  .delete(removeOneProductById);

export default productRouter;
