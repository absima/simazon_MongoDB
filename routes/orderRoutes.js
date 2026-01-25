// routes/orderRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderControllers.js';

const orderRouter = express.Router();

orderRouter.post('/', protect, createOrder);
orderRouter.get('/my', protect, getMyOrders);
orderRouter.get('/:id', protect, getOrderById); 

export default orderRouter;
