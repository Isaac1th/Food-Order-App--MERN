import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoute.js';

import Order from './models/orderModel.js';

import Stripe from 'stripe';

dotenv.config();

connectDB();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

const __dirname = path.resolve();

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
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
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

// app.get('/', (req, res) => {
//   res.json({ message: "Welcome to Isaac's Place" });
// });

app.use('/api/', productRoutes);
app.use('/api/', userRoutes);

// --------------------STRIPE CREATE PAYMENT INTENT-----------------------------------

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { orderItems, shippingAddress, userId } = req.body;

    const totalPrice = calcOrderAmount(orderItems);
    // const totalPrice = 150;

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
      amount: totalPrice,
      currency: 'usd',
      // payment_method_types: ['card'],
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
// --------------------------------------------------------------------

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port 6000`.yellow.bold
  )
);
