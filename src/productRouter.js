const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('./productos.json', 'utf8');
    const products = JSON.parse(data);
    res.render('index', { products });
  } catch (error) {
    console.error('Error Interno del Servidor', error);
    res.status(500).json({ error: 'Error Interno del Servidor.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('./productos.json', 'utf8');
    const products = JSON.parse(data);
    res.render('home', { products });
  } catch (error) {
    console.error('Error Interno del Servidor', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});


module.exports = router;
