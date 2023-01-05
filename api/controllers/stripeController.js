// import Stripe from 'stripe';
// import express from 'express';
// import dotenv from 'dotenv';

// // @desc Create payment intent
// // @route POST /api/create-payment-intent
// // @access Public
// const calcOrderAmount = (orderItems) => {
//   const initialValue = 0;
//   const itemsPrice = orderItems.reduce(
//     (previousValue, currentValue) =>
//       previousValue + currentValue.price * currentValue.amount,
//     initialValue
//   );
//   return itemsPrice * 100;
// };

// const createPaymentIntent = async (req, res) => {
//   try {
//     const { orderItems, shippingAddress, userId } = req.body;
//     console.log(shippingAddress);

//     const totalPrice = calcOrderAmount(orderItems);

//     const taxPrice = 0;
//     const shippingPrice = 0;

//     const order = new Order({
//       orderItems,
//       shippingAddress,
//       paymentMethod: 'stripe',
//       totalPrice,
//       taxPrice,
//       shippingPrice,
//       user: '',
//     });

//     // await order.save();

//     const paymentIntent = await Stripe.paymentIntents.create({
//       amount: totalPrice,
//       currency: 'usd',
//     });

//     // process.env.STRIPE_SECRET_KEY

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     res.status(400).json({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// };

// // @desc Expose a endpoint as a webhook handler for asynchronous events.
// // @route POST /api/webhook
// // @access Public
// // const endpointSecret =
// //   'whsec_7bdd0e42515ec75bb6ea4a46d7794841734aea39355215b50e082bb83754d373';

// // const getWebHook = () => {
// //   express.raw({ type: 'application/json' }),
// //     (request, response) => {
// //       const sig = request.headers['stripe-signature'];

// //       let event;

// //       try {
// //         event = Stripe.webhooks.constructEvent(
// //           request.body,
// //           sig,
// //           endpointSecret
// //         );
// //       } catch (err) {
// //         response.status(400).send(`Webhook Error: ${err.message}`);
// //         return;
// //       }

// //       // Handle the event
// //       console.log(`Unhandled event type ${event.type}`);

// //       // Return a 200 response to acknowledge receipt of the event
// //       response.send();
// //     };
// // };

// export default { createPaymentIntent };
// // export default { createPaymentIntent, getWebHook };
