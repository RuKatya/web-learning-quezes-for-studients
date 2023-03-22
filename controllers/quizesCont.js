const connection = require("../connection")

exports.getQuizesSubject = async (req, res) => {
    try {
        const { SubjectID } = req.body
        const query = `SELECT * FROM quizes WHERE SubjectID = ${SubjectID};`

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