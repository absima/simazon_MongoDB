import 'dotenv/config';
// import { generateToken, decodeToken } from '../utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 5 characters long.' });
    }
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });
    }
    if (!name) {
      name = email;
    }
    const token = jwt.sign({username: username }, process.env.JWT_SECRET);
    const hashedpass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: hashedpass,
      token,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----
const loginUser = async (req, res) => {
  console.log('loginUser');
  try {
    const { username, password } = req.body;
    console.log('req.body', req.body);
    if (!username || !password) {
      return res.status(400).json({ error: 'please complete all details!' });
    }
    const user = await User.findOne({ username: username });
    console.log('user -- backend', user);
    if (!user) {
      return res.status(400).json({ error: 'user does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch', isMatch);
    if (!isMatch) {
      return res.status(401).send('invalid password');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    await User.updateOne({ id: user._id}, { $set: { token: token } });
    // const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
    // await User.updateOne({ username: username }, { $set: { token: token } });
    console.log('token', token);
    // res.cookie('token', token, { httpOnly: true });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// log out user
const logoutUser = async (req, res) => {
  try {
    const { username, token } = req.body;
    await User.updateOne({ username: username }, { $set: { token: '' } });
    res.status(200).json({ msg: 'logged out' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user profile
const getUserProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User
      .findOne({ username: username }) 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, logoutUser, getUserProfile };
