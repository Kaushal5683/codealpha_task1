const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'RADHAKRISHNA@12',
    database: 'ecommerce'
});

module.exports = db;