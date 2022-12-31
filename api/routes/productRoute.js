import express from 'express';

const router = express.Router();

import Product from '../model/productModel.js';

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

export default router;
