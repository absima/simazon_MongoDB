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
app.use('/item', productRouter);

app.listen(port, () => console.log(`listening to port ${port}`));


// // register endpoint
// app.post("/register", (request, response) => {
//   // hash the password
//   bcrypt
//     .hash(request.body.password, 10)
//     .then((hashedPassword) => {
//       // create a new user instance and collect the data
//       const user = new User({
//         email: request.body.email,
//         password: hashedPassword,
//       });

//       // save the new user
//       user
//         .save()
//         // return success if the new user is added to the database successfully
//         .then((result) => {
//           response.status(201).send({
//             message: "User Created Successfully",
//             result,
//           });
//         })
//         // catch error if the new user wasn't added successfully to the database
//         .catch((error) => {
//           response.status(500).send({
//             message: "Error creating user",
//             error,
//           });
//         });
//     })
//     // catch error if the password hash isn't successful
//     .catch((e) => {
//       response.status(500).send({
//         message: "Password was not hashed successfully",
//         e,
//       });
//     });
// });