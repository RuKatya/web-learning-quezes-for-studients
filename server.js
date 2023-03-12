const express = require('express')
const app = express()
// const sql = require('mssql');
const { Client } = require('pg');
const PORT = process.env.PORT || 8080
require('dotenv').config()

app.use(express.json())
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(() => {
    console.log(`db connected`)
});

// const query = `CREATE TABLE first_table_of_my_life (
//     name varchar(225)
// )`
// const query = `INSERT INTO first_table_of_my_life (name) VALUES ("Katya")`
// const query = `SELECT * FROM first_table_of_my_life`

// client.query(query, (err, res) => {
//     if (err) throw err;

//     console.log(res)
//     // for (let row of res.rows) {
//     //     console.log(JSON.stringify(row));
//     // }
//     client.end();
// });

app.get('/get-info', (req, res) => {
    const query = `SELECT * FROM first_table_of_my_life`

    client.query(query, (err, answer) => {
        if (err) throw err;

        res.send(answer.rows)
    })
})

app.post('/insert-info', (req, res) => {
    const { name } = req.body

    console.log(name)

    if (name) {
        const query = `INSERT INTO first_table_of_my_life (name) VALUES ('${name}')`

        client.query(query, (err, answer) => {
            if (err) throw err;

            return res.send(answer.rows)
        })
    }

    // res.send('name is empty')
})

// const query = `DROP TABLE first_table;`
// client.query(query, (err, answer) => {
//     if (err) throw err;
//     console.log(answer)
//     // return res.send(answer.rows)
// })


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})