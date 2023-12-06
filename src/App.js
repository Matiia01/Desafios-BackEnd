const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const ProductManager = require('./ProductManager'); 
const productRouter = require('./productRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.set('socketio', io);


const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

const productManager = new ProductManager(path.join(__dirname, 'src', 'productos.json'), io);

app.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('index', { products });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error interno al obtener productos');
  }
});


app.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.on('addProduct', (product) => {
    try {
      io.emit('productAdded', product);
    } catch (error) {
      console.error('Error al emitir producto agregado:', error);
    }
  });
});


app.use('/api/products', productRouter);

const port = 8080;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});