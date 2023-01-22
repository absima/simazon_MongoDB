import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      res.status(400).end();
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
    const token = jwt.sign({ user: savedUser }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.send({ user: savedUser, token });
  } catch (err) {
    console.log('POST signup, Something Went Wrong: ', err);
    res.status(400).send({ error: true, message: err.message });
  }
};

//SIGN IN API
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).end();
      return;
    }

    // check if user exists

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ msg: 'Invalid username or password' });
      return;
    }

    // check if password is correct
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid username or password 2' });
      return;
    }
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.send({ user, token });
    // res.status(200).json({ token });
  } catch (err) {
    console.log('POST auth/signin, Something Went Wrong: ', err);
    res.status(400).send({ error: true, message: err.message });
  }
};

// GET USER FROM TOKEN API
const me = async (req, res) => {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
    // const token = String(req.headers.authorization?.replace('Bearer ', ''));
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      res.status(400).json(defaultReturnObject);
      return;
    }

    const user = await User.findOne({ _id: decoded.user._id });
    if (!user) {
      res.status(400).json(defaultReturnObject);
      return;
    }
    delete user.password;
    res.status(200).json({ authenticated: true, user });
  } catch (err) {
    console.log('POST me, Something Went Wrong', err);
    res.status(400).json(defaultReturnObject);
  }
};

// update user
// update a contact
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedContact);
  } catch (error) {
    res.send(error);
  }
};

export { registerUser, loginUser, me, updateUser };

// // older version

// import 'dotenv/config';
// // import { generateToken, decodeToken } from '../utils.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { User } from '../models/userModel.js';

// const registerUser = async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(400).json({ msg: 'Not all fields have been entered.' });
//     }
//     if (password.length < 5) {
//       return res
//         .status(400)
//         .json({ msg: 'The password needs to be at least 5 characters long.' });
//     }
//     const existingUser = await User.findOne({
//       email: email,
//     });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ msg: 'An account with this email already exists.' });
//     }
//     if (!name) {
//       name = email;
//     }
//     const token = jwt.sign({username: username }, process.env.JWT_SECRET);
//     const hashedpass = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name: name,
//       username: username,
//       email: email,
//       password: hashedpass,
//       token,
//     });
//     const savedUser = await newUser.save();
//     res.json(savedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // -----
// const loginUser = async (req, res) => {
//   console.log('loginUser');
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: 'please complete all details!' });
//     }
//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(400).json({ error: 'user does not exist' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log('isMatch', isMatch);
//     if (!isMatch) {
//       return res.status(401).send('invalid password');
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     await User.updateOne({ id: user._id}, { $set: { token: token } });
//     // const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
//     // await User.updateOne({ username: username }, { $set: { token: token } });
//     console.log('token', token);
//     // console.log('token', token);
//     // res.cookie('token', token, { httpOnly: true });
//     res.status(200).json(token);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // log out user
// const logoutUser = async (req, res) => {
//   try {
//     const { username, token } = req.body;
//     await User.updateOne({ username: username }, { $set: { token: '' } });
//     res.status(200).json({ msg: 'logged out' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // get user profile
// const getUserProfile = async (req, res) => {
//   try {
//     const { username } = req.body;
//     const user = await User
//       .findOne({ username: username })
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export { registerUser, loginUser, logoutUser, getUserProfile };
