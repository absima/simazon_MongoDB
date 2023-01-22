import { Product } from '../models/productModel.js';

// get all products
const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.json(allProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get a product by id
const getProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  try {
    const pr = await Product.findOne({ _id: id });
    // .populate('cart')
    res.status(200).json(pr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export {
  getProducts,
  getProductByID,
  addProductToCart,
};

//// create a new product
// const createProduct = async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     discountPercentage,
//     rating,
//     stock,
//     brand,
//     category,
//     thumbnail,
//     images,
//   } = req.body;

//   try {
//     if (
//       !title ||
//       !description ||
//       !price ||
//       !discountPercentage ||
//       !rating ||
//       !stock ||
//       !brand ||
//       !category ||
//       !thumbnail ||
//       !images
//     ) {
//       return res.status(400).json({ error: 'please complete all details' });
//     }

//     const newProduct = await Product.create({
//       title,
//       description,
//       price,
//       discountPercentage,
//       rating,
//       stock,
//       brand,
//       category,
//       thumbnail,
//       images,
//     });
//     return res.json(newProduct);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
