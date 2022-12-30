import exress from 'express';

const router = express.router();

import Product from '../model/productModel';

router.get('/products', async (req, res) => {
  try {
  } catch (err) {
    return console.log(err);
  }
});

export default router;
