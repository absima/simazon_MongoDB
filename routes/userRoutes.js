import express from 'express';
import {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  getUserByEmail,
  updateUserEmail,
  suspendUserById,
} from '../controllers/userControllers.js';

const userRouter = express.Router();

// route for getting all users
userRouter.route('/').get(getUsers);

// route for registering a new user
userRouter.route('/register').post(registerUser);

// route for logging in a user
userRouter.route('/login').post(loginUser);

// route for logging out a user
userRouter.route('/logout').post(logoutUser);

// route for getting a user by id
userRouter.route('/:id').get(getUserById);

// route for getting a user by email
userRouter.route('/email/:email').get(getUserByEmail);

// route for updating a user's email
userRouter.route('/:id').put(updateUserEmail);

// route for suspending a user
userRouter.route('/:id').delete(suspendUserById);

export default userRouter;

// userRouter.route('/').get(getAllUsers).post(createOneUser);

// userRouter
//   .route('/:id')
//   .get(getOneUserById)
//   .put(updateOneUserEmail)
//   .delete(suspendOneUserById);

// userRouter.route('/login').post(loginOneUser);
