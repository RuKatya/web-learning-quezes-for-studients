const connection = require("../connection")

exports.getAllSubjects = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects;`

        connection.query(query, (err, result, fields) => {
            if (err) throw err

            res.send(result)
            console.log(result)
            console.log(fields)
        })
    } catch (error) {
        console.log(error)
    }
}