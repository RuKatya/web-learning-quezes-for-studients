const express = require('express')
const app = express()
const sql = require('mssql');
const PORT = process.env.PORT || 8080
require('dotenv').config()

const config = {
    user: process.env.SQL_MICROSOFT_DB_USER,
    // 'username', // better stored in an app setting such as process.env.DB_USER
    password: process.env.SQL_MICROSOFT_DB_PASSWORD,
    // 'password', // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.SQL_MICROSOFT_DB_SERVER,
    // 'your_server.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    // port: 8081,
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

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        // var resultSet = await poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
        //     p.name as ProductName 
        //     FROM [SalesLT].[ProductCategory] pc
        //     JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);

        // console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})