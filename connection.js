const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.HOST_PORT,
    user: process.env.HOST_USER,
    password: process.env.HOST_PASS,
    database: process.env.HOST_DB
});

module.exports = connection;