import express from 'express';
import {
  registerUser,
  loginUser,
  me,
  updateUser
} from '../controllers/userControllers.js';

const userRouter = express.Router();

// route for registering a new user
userRouter.route('/register').post(registerUser);

// route for logging in a user
userRouter.route('/login').post(loginUser);

// route for getting user profile
userRouter.route('/me').get(me);

// route for updating a user
userRouter.route('/update/:id').put(updateUser);

// // route for logging out a user
// userRouter.route('/logout').post(logoutUser);

// // route for getting user profile
// userRouter.route('/profile/:username').get(getUserProfile);


export default userRouter;

