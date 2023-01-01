import express from 'express';

const router = express.Router();

import {
  getProducts,
  getProductByCategory,
} from '../controllers/productController.js';

router.get('/products', getProducts);

router.get('/products-by-categories', getProductByCategory);

export default router;
