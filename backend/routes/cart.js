const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { cart } = req.body;
    for (const item of cart) {
        await db.execute('INSERT INTO orders (product_id, quantity) VALUES (?, ?)', [item.id, 1]);
    }
    res.json({ message: 'Order placed successfully!' });
});

module.exports = router;