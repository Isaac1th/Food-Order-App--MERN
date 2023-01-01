import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length == 0) return res.status(404).send('not found');
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @desc products by category
// @route GET /api/products-by-categories
// @access Public
const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: {} },
      {
        $group: {
          _id: '$category',
          products: { $push: '$$ROOT' },
        },
      },
      { $project: { name: '$_id', products: 1, _id: 0 } },
    ]);
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export { getProducts, getProductByCategory };
