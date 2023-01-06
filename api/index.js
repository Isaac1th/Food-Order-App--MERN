import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoute.js';

import Order from './models/orderModel.js';

import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51KmZiECvR3K38GnIJ9IrdfpiIKNagJCWqACTZ78cjWUhzlX1hje7eJ44ftHfwPMNiAKMzHXCAr4O4Jp22B86AQTx00Swc6yuyO'
);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();

connectDB();

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

const calcOrderAmount = (orderItems) => {
  const initialValue = 0;
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    initialValue
  );
  return itemsPrice * 100;
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);
// -----------------
// This is your Stripe CLI webhook secret for testing your endpoint locally.

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        'whsec_7bdd0e42515ec75bb6ea4a46d7794841734aea39355215b50e082bb83754d373'
        // process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log('test');
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// app.listen(4242, () => console.log('Running on port 4242'));

// ----------------

app.use(express.json());

const PORT = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Isaac's Place" });
});

app.use('/api/', productRoutes);
app.use('/api/', userRoutes);

// -------------------------------------------------------

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { orderItems, shippingAddress, userId } = req.body;
    console.log(shippingAddress);

    const totalPrice = calcOrderAmount(orderItems);

    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod: 'stripe',
      totalPrice,
      taxPrice,
      shippingPrice,
      user: '',
    });

    await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    console.log(paymentIntent.client_secret);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
});

// --------------------------------------------------------------------

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port 6000`.yellow.bold
  )
);
