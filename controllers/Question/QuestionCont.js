const connection = require("../../connection")

exports.saveNewQuestions = (req, res) => {
    try {
        const { questions } = req.body

        console.log(questions)

        const query = `INSERT INTO title_qustions (QuestionText, Answer1, Answer2, Answer3, Answer4, Title_QuizID, RigthQuestion) VALUES ?`

        connection.query(query, [questions], (err, result) => {
            if (err) {
                res.send(err.sqlMessage)
                return console.log(err.sqlMessage)
            }

            console.log(result)
            return res.send("saved")
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getAllQuestionsByTitle = async (req, res) => {
    try {
        const { Title_QuizID } = req.body

        const query = `SELECT * FROM title_qustions WHERE Title_QuizID = ${Title_QuizID}`

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