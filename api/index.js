import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoute.js';

dotenv.config();

connectDB();

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Isaac's Place" });
});

app.use('/api/', productRoutes);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port 6000`.yellow.bold
  )
);
