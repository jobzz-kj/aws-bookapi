// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'admin',
    password: 'password',
    database: 'bookstore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();