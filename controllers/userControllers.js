import { generateToken, decodeToken } from '../utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, passwordCheck } = req.body;
    if (!name || !email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 5 characters long.' });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });
    }
    // check if email already exists
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
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //   if (!name || !email || !password) {
  //     return res.status(400).json({ error: 'please complete all details' });
  //   }
  //   const newone = await User.create({ name, email, password, isAdmin });
  //   console.log(newone);
  //   return res.json(newone);
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }
};

// -----
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'please complete all details' });
    }
    const user = await User.findOne({ email: email });
    console.log('user', user);
    if (!user) {
      return res.status(400).json({ error: 'user does not exist' });
    }
    // const isMatch = await bcrypt.compare(password, user.password);

    const isMatch = password === user.password;

    console.log('isMatch', isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: 'invalid password' });
    }

    // ======
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      'RANDOM-TOKEN',
      { expiresIn: '24h' }
    );

    //   return success response
    res.status(200).send({
      message: 'Login Successful',
      email: user.email,
      token,
    });
    // ======
  } catch (error) {
    console.log('here');
    return res.status(500).json({ error: error.message });
  }
};

// log out user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({ message: 'User successfully logged out' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // const user = await User.find({ id });
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// get user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const updateUserEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const updating = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        email: email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(updating);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const suspendUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleting = await User.findByIdAndDelete({
      _id: id,
    });
    if (!deleting) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
    return res.json(deleting);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  getUserByEmail,
  updateUserEmail,
  suspendUserById,
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: 'please complete all details' });
//     }
//     const user
//     = await
//     User.findOne
//     ({ email
//     });
//     if (!user) {
//       return res.status(400).json({ error: 'user does not exist' });
//     }
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'invalid password' });
//     }
//     const token = generateToken(user._id);
//     return res.json({ token });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const loginUser = async (req, res) => {
//   const errorCase = (result) =>
//     result
//       .status(400) // the http Response will contain this - always think about the correct one eg. 201 for created
//       .json({
//         // this is the body of the response - fetch().then(res => res.json()).then(data => data) will return this
//         success: false,
//         message: 'invalid email-pass combination',
//         data: null,
//       });

//   try {
//     // find user (if exists?)
//     const user = await User.findOne({ email: req.body.email });
//     console.log('from within', user)
//     // if not exists, direct to register/error
//     if (!user) {
//       errorCase(res);
//     }
//     // if exists, compare password
//     else {
//       bcrypt.compare(req.body.password, user.password, function (err, resp) {
//         // if password not match, error/ usernamexpass
//         if (err || !resp) return errorCase(res);
//         // if password matches, redirect the correct route
//         // Send JWT
//         return res.status(200).json({
//           success: true,
//           message: 'welcome',
//           data: generateToken(user) //user, // JWT
//         });
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       data: error,
//     });
//   }
// };
