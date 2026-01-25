// controllers/orderControllers.js
import { Order } from '../models/orderModel.js';


// POST /orders  (JWT required)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: true, message: 'No order items' });
    }

    const order = await Order.create({
      user: req.userId, // set by protect middleware
      orderItems,
      itemsPrice: Number(itemsPrice || 0),
      shippingPrice: Number(shippingPrice || 0),
      totalPrice: Number(totalPrice || 0),
    });

    return res.status(201).json(order);
  } catch (err) {
    console.log('createOrder error:', err);
    return res.status(400).json({ error: true, message: err.message });
  }
};

// GET /orders/my  (JWT required)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (err) {
    console.log('getMyOrders error:', err);
    return res.status(400).json({ error: true, message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: true, message: 'Order not found' });
    }

    // user can only access their own orders (basic)
    if (String(order.user) !== String(req.userId)) {
      return res.status(403).json({ error: true, message: 'Forbidden' });
    }

    return res.status(200).json(order);
  } catch (err) {
    console.log('getOrderById error:', err);
    return res.status(400).json({ error: true, message: err.message });
  }
};
