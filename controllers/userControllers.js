import { generateToken } from '../utils.js';
import { User } from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createOneUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'please complete all details' });
    }
    const newone = await User.create({ name, email, password, isAdmin });
    console.log(newone);
    return res.json(newone);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginOneUser = async (req, res) => {
  const errorCase = (result) =>
    result
      .status(400) // the http Response will contain this - always think about the correct one eg. 201 for created
      .json({
        // this is the body of the response - fetch().then(res => res.json()).then(data => data) will return this
        success: false,
        message: 'invalid email-pass combination',
        data: null,
      });

  try {
    // find user (if exists?)
    const user = await User.find({ email: req.body.email });
    // if not exists, direct to register/error
    if (!user) {
      errorCase(res);
    }
    // if exists, compare password
    else {
      bcrypt.compare(req.body.password, user.password, function (err, resp) {
        // if password not match, error/ usernamexpass
        if (err || !resp) return errorCase(res);
        // if password matches, redirect the correct route
        // Send JWT
        return res.status(200).json({
          success: true,
          message: 'welcome',
          data: generateToken(user) //user, // JWT
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const getOneUserById = async (req, res) => {
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

const updateOneUserEmail = async (req, res) => {
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

const suspendOneUserById = async (req, res) => {
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
  getAllUsers,
  createOneUser,
  getOneUserById,
  loginOneUser,
  updateOneUserEmail,
  suspendOneUserById,
};
