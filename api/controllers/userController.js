import User from '../models/userModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public

const createUser = () => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    _id: req.body._id,
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.status(200).send({ data: user });
    }
  });
};

export { createUser };
