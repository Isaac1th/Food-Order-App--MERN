// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true }).catch((error) => {
//   console.error('Connection error', e.message);
// });

// const db = mongoose.connection;

// module.exports = db;

import mongoose from 'mongoose';

mongoose.set('strictQuery', true); // Remove deprecation warning

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
