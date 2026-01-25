// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const protect = (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization || '';
    const token = String(authHeader).replace('Bearer ', '').trim();

    if (!token) {
      return res.status(401).json({ error: true, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded?.user?._id;

    if (!userId) {
      return res.status(401).json({ error: true, message: 'Not authorized, invalid token' });
    }

    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: true, message: 'Not authorized' });
  }
};

