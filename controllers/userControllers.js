// controllers/userControllers.js
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).send({ error: true, message: 'Missing fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const userData = {
      name,
      username,
      email,
      password: hashedPassword,
    };

    const user = new User(userData);
    const savedUser = await user.save();

    // (Optional but recommended) don’t return password even if hashed
    const userSafe = savedUser.toObject();
    delete userSafe.password;

    const token = jwt.sign({ user: { _id: savedUser._id } }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.send({ user: userSafe, token });
  } catch (err) {
    console.log('POST signup, Something Went Wrong: ', err);
    return res.status(400).send({ error: true, message: err.message });
  }
};

// SIGN IN API
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: true, message: 'Missing credentials' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: true, message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: true, message: 'Invalid username or password' });
    }

    // (Optional) don’t return password
    const userSafe = user.toObject();
    delete userSafe.password;

    const token = jwt.sign({ user: { _id: user._id } }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.send({ user: userSafe, token });
  } catch (err) {
    console.log('POST auth/signin, Something Went Wrong: ', err);
    return res.status(400).send({ error: true, message: err.message });
  }
};

// GET USER FROM TOKEN API
const me = async (req, res) => {
  const defaultReturnObject = { authenticated: false, user: null };

  try {
    const authHeader = req?.headers?.authorization || '';
    const token = String(authHeader).replace('Bearer ', '').trim();

    if (!token) {
      return res.status(400).json(defaultReturnObject);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded?.user?._id;

    if (!userId) {
      return res.status(400).json(defaultReturnObject);
    }

    // ✅ exclude password safely
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(400).json(defaultReturnObject);
    }

    return res.status(200).json({ authenticated: true, user });
  } catch (err) {
    console.log('POST/GET me, Something Went Wrong', err);
    return res.status(400).json(defaultReturnObject);
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional safety: prevent password update here unless you re-hash
    if (req.body?.password) {
      return res.status(400).json({
        error: true,
        message: 'Password updates not supported here.',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.log('PUT/PATCH updateUser, Something Went Wrong', error);
    return res.status(400).send({ error: true, message: error.message });
  }
};

export { registerUser, loginUser, me, updateUser };

