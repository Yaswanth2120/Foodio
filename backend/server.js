const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Foodio API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const recipeRoutes = require('./recipes');
app.use('/recipes', recipeRoutes);

const authRoutes = require('./auth');
app.use('/auth', authRoutes);