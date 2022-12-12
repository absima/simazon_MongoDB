import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from '../controllers/userControllers.js';

const userRouter = express.Router();

// route for registering a new user
userRouter.route('/register').post(registerUser);

// route for logging in a user
userRouter.route('/login').post(loginUser);

// route for logging out a user
userRouter.route('/logout').post(logoutUser);

// route for getting user profile
userRouter.route('/profile/:username').get(getUserProfile);


export default userRouter;

