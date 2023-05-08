const connection = require("../../connection")

exports.saveNewTitle = (req, res) => {
    try {
        const { Title, SubjectID } = req.body

        if (Title == undefined || SubjectID == undefined) {
            return res.send({ continueWork: false, message: "Title or SubjectID are missing" })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID) VALUES ("${Title}", "${SubjectID}")`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror TitleCont.js line:11 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            const numberId = Number(SubjectID)
            return res.send({ continueWork: true, message: "Subject Saved", SubjectID: numberId, Title, Title_QuizID: result.insertId })
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        connection.query(query, (err, titles) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, titles })
        })
    } catch (error) {
        console.log(error)
    }
}