import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import mongoConnect from './db/mongoConnection.js';

mongoConnect();
console.log('mongo connected');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({ key: 'hello, world?!' }));

app.use('/user', userRouter);
app.use('/item', productRouter);

// app.get('/profile/:username', validateToken, (req, res) => {
//   console.log('Token is valid.');
//   console.log(req.username.username);
// });

app.listen(port, () => console.log(`listening to port ${port}`));
