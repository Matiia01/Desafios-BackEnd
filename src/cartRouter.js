const express = require('express');
const fs = require('fs').promises;
const { getCartById, addProductToCart } = require('./cartManager'); 
const CARTS_PATH = 'productos.json';

const cartRouter = express.Router();


cartRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await getCartById(cartId);
    if (cart) {
      res.json({ cart });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error('Error en la ruta /api/carts/:cid', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});


cartRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    await addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito exitosamente' });
  } catch (error) {
    console.error('Error en la ruta /api/carts/:cid/product/:pid', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});


module.exports = cartRouter;
