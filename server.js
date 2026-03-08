import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import mongoConnect from './db/mongoConnection.js';

const app = express();
const port = process.env.PORT || 5050;

const allowedOrigins = [
  'https://simazon.netlify.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).json({ key: 'hello, world?!' });
});

app.post('/debug/admin-key', (req, res) => {
  res.json({
    headerPresent: Boolean(req.header('x-admin-key')),
    headerLength: (req.header('x-admin-key') || '').length,
  });
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/orders', orderRouter);

mongoConnect()
  .then(() => {
    console.log('mongo connected');
    app.listen(port, () => console.log(`listening to port ${port}`));
  })
  .catch((err) => {
    console.error('mongo connection failed:', err);
    process.exit(1);
  });

