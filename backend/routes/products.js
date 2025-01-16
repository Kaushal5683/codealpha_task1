
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const [products] = await db.execute('SELECT * FROM products');
    res.json(products);
});

module.exports = router;
