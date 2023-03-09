const express = require('express')
const app = express()
const sql = require('mssql');
require('dotenv').config()

const config = {
    user: process.env.SQL_MICROSOFT_DB_USER,
    // 'username', // better stored in an app setting such as process.env.DB_USER
    password: process.env.SQL_MICROSOFT_DB_PASSWORD,
    // 'password', // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.SQL_MICROSOFT_DB_SERVER,
    // 'your_server.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: process.env.SQL_MICROSOFT_DB_PORT,
    // 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: process.env.SQL_MICROSOFT_DB_NAME,
    // 'AdventureWorksLT', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}