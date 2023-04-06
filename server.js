if(process.env.NODE_ENV == "production") {
    require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)}); 
} else {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2');
const PORT = process.env.PORT || 8080
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(express.static('client/build'))

console.log(`./.env.${process.env.NODE_ENV}`)
console.log(process.env.NODE_ENV)

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.HOST_PORT,
    user: process.env.HOST_USER,
    password: process.env.HOST_PASS,
    database: process.env.HOST_DB
});

(async () => {
    try {
        await connection.connect();
        console.log(`db connected`)
    } catch (error) {
        console.log('%cserver.js line:28 error');
        console.log(error)
    }
})()

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});


app.use('/users', require('./routers/Users/usersRout'))
app.use('/subjects', require('./routers/Subject/subjectsRout'))
app.use('/title-quiz', require('./routers/Title/TitleRou'))
app.use('/title-questions', require('./routers/Questions/QuestionRout'))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})










// const connectDB = async () => {
//     try {
//         await connection.connect();
//         console.log(`db connected`)
//     } catch (error) {
//         console.log(error)
//     }
// }

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

// app.get('/get-info', (req, res) => {
//     console.log(`wqeqwe`)

//     const query = `SELECT * FROM first_table_of_my_life`

//     client.query(query, (err, answer) => {
//         console.log(`qweqweqweqwe`)
//         if (err) throw err;

//         res.send(answer.rows)
//     })
// })

// app.post('/insert-info', (req, res) => {
//     const { name } = req.body

//     console.log(name)

//     if (name) {
//         const query = `INSERT INTO first_table_of_my_life (name) VALUES ('${name}')`

//         client.query(query, (err, answer) => {
//             if (err) throw err;

//             return res.send(answer.rows)
//         })
//     }

//     // res.send('name is empty')
// })

// const query = `DROP TABLE first_table;`
// client.query(query, (err, answer) => {
//     if (err) throw err;
//     console.log(answer)
//     // return res.send(answer.rows)
// })