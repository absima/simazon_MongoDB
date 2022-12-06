import { Product } from '../models/productModel.js';

// create a new product
const createProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;

  try {
    if (
      !title ||
      !description ||
      !price ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !brand ||
      !category ||
      !thumbnail ||
      !images
    ) {
      return res.status(400).json({ error: 'please complete all details' });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    });
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

// update a product by id
const updateProductByID = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;
  try {
    const updating = await Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        thumbnail: thumbnail,
        images: images,
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

// delete a product by id
const deleteProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deleting = await Product.findByIdAndDelete({ _id: id });
    return res.json(deleting);
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

// // add a product to cart
// const addProductToCart = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const adding = await Product.findByIdAndUpdate(
//       {
//         _id: id,
//       },
//       {
//         $inc: { stock: -1 },
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     return res.json(adding);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// add a review to a product
const addReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  try {
    const adding = await Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: { reviews: review },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(adding);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createProduct,
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  addProductToCart,
};

//
