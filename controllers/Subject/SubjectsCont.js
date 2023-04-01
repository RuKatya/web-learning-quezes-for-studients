const connection = require("../../connection")

exports.saveNewSubject = (req, res) => {
    try {
        const { subjectName } = req.body

        const query = `INSERT INTO subjects (subjectName) VALUES ("${subjectName}")`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:11 ', err.sqlMessage);
                return res.send({ continue: false, message: err.sqlMessage })
            }

            return res.send({ continue: true, message: "Subject Saved", subjectName })
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getAllSubjects = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects;`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continue: false, message: err.sqlMessage })
            }

            return res.send({ continue: true, result })
        })
    } catch (error) {
        console.log(error)
    }
}