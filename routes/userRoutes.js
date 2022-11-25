import express from 'express';
import {
  getAllUsers,
  createOneUser,
  getOneUserById,
  loginOneUser,
  updateOneUserEmail,
  suspendOneUserById,
} from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createOneUser);

userRouter
  .route('/:id')
  .get(getOneUserById)
  .put(updateOneUserEmail)
  .delete(suspendOneUserById);

userRouter.route('/login').post(loginOneUser);

export default userRouter;
