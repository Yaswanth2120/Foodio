const express = require('express');
const { Pool } = require('pg');
const verifyToken = require('./VerifyToken'); // Ensure you have this middleware for JWT verification
require('dotenv').config();

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create a new recipe
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const userId = req.user.id; // Assuming verifyToken middleware sets req.user
    const result = await pool.query(
      'INSERT INTO recipes (user_id, title, description, ingredients, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, title, description, ingredients, instructions]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Recipe not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a recipe
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions } = req.body;
    const userId = req.user.id;

    // Ensure the recipe belongs to the logged-in user
    const checkResult = await pool.query('SELECT * FROM recipes WHERE id = $1 AND user_id = $2', [id, userId]);
    if (checkResult.rows.length === 0) return res.status(404).json({ error: 'Recipe not found or not authorized' });

    const result = await pool.query(
      'UPDATE recipes SET title=$1, description=$2, ingredients=$3, instructions=$4 WHERE id=$5 RETURNING *',
      [title, description, ingredients, instructions, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a recipe
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Ensure the recipe belongs to the logged-in user
    const checkResult = await pool.query('SELECT * FROM recipes WHERE id = $1 AND user_id = $2', [id, userId]);
    if (checkResult.rows.length === 0) return res.status(404).json({ error: 'Recipe not found or not authorized' });

    await pool.query('DELETE FROM recipes WHERE id=$1', [id]);
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;