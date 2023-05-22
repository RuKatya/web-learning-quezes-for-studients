const connection = require("../../connection")

exports.saveNewQuestions = (req, res) => {
    try {
        const { questions, draft } = req.body

        const questionsToServer = questions.map(iii =>
            Object.values(iii)
        )

        console.log(questionsToServer)

        const query = `INSERT INTO title_qustions (QuestionText, Answer1, Answer2, Answer3, Answer4, Title_QuizID, RigthQuestion, SubjectID) VALUES ?`

        connection.query(query, [questionsToServer], (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:11 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, message: "Saved", questions })
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getAllQuestionsByTitle = async (req, res) => {
    try {
        const { Title_QuizID } = req.body

        console.log(Title_QuizID)
        const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${Title_QuizID}`

        connection.query(getQuestions, (err, questions) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            console.log(questions)

            return res.send({ continueWork: true, questions })
        })
    } catch (error) {
        console.log(error)
    }
}