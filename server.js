import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

import mongoConnection from './db/mongoConnection.js';

mongoConnection();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => res.status(200).json({ hello: 'welcome' }));
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(port, () => console.log(`listening to port ${port}`));
