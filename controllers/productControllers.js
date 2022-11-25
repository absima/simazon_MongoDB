import { Product } from '../models/productModel.js';

const getAllProducts = async (req, res) => {
  try {
    const allprods = await Product.find();
    return res.json(allprods);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createOneProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      price,
      countInStock,
      brand,
      rating,
      numReviews,
      description,
    } = req.body;

    if (
      !name ||
      !category ||
      !image ||
      !price ||
      !countInStock ||
      !brand ||
      !rating ||
      !numReviews ||
      !description
    ) {
      return res.status(400).json({ error: 'please complete all details' });
    }

    const newprod = await Product.create({
      name,
      category,
      image,
      price,
      countInStock,
      brand,
      rating,
      numReviews,
      description,
    });
    return res.json(newprod);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOneProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    // const user = await User.find({ id });
    const prdct = await Product.findOne({ _id: id });
    res.status(200).json(prdct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateOneProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    image,
    price,
    countInStock,
    brand,
    rating,
    numReviews,
    description,
  } = req.body;
  try {
    const updating = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        category: category,
        image: image,
        price: price,
        countInStock: countInStock,
        brand: brand,
        rating: rating,
        numReviews: numReviews,
        description: description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(updating);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const removeOneProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleting = await Product.findByIdAndDelete({
      _id: id,
    });
    if (!deleting) {
      return res.status(500).json({
        message: 'item not found',
      });
    }
    return res.json(deleting);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  getAllProducts,
  createOneProduct,
  getOneProductByID,
  updateOneProduct,
  removeOneProductById,
};
