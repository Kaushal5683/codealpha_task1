const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
