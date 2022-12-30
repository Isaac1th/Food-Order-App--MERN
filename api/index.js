// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express, { application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

app.use(express.json());

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
