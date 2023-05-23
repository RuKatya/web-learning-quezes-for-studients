const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const { deleteValidation } = require("../../validation/dashboardValid")

// ---- Saves Question ---- //
exports.saveNewQuestions = (req, res) => {
    try {
        const { questions, draft } = req.body
        const TitleID = questions[0].Title_QuizID

        const questionsToServer = questions.map(obj =>
            Object.values(obj)
        )

        const query = `INSERT INTO title_qustions (QuestionText, Answer1, Answer2, Answer3, Answer4, Title_QuizID, RigthQuestion, SubjectID) VALUES ?`

        connection.query(query, [questionsToServer], (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:11 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            const saveTitleDraft = `UPDATE titles_quizes SET Draft = ${draft} WHERE Title_QuizID = ${TitleID}`

            connection.query(saveTitleDraft, err => {
                if (err) {
                    console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.sqlMessage })
                }
            })

            const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${TitleID}`

            connection.query(getQuestions, (err, questions) => {
                if (err) {
                    console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.sqlMessage })
                }

                return res.send({ continueWork: true, message: "Saved", questions })
            })
        })
    } catch (error) {
        console.log('%cQuestionCont.js line:24 saveNewQuestions error');
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

// ---- Get All Questions ---- //
exports.getAllQuestionsByTitle = async (req, res) => {
    try {
        const { Title_QuizID } = req.body

        const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${Title_QuizID}`

        connection.query(getQuestions, (err, questions) => {
            if (err) {
                console.log('getAllQuestionsByTitle line:54:', error.message);
                return res
                    .status(httpCodes.FORBIDDEN)
                    .send({
                        continueWork: false,
                        message: error.message
                    })
            }

            return res.send({ continueWork: true, questions })
        })
    } catch (error) {
        console.log('%cQuestionCont.js line:50 getAllQuestionsByTitle error');
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

// ---- Delete Question ---- //
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuestionQuery = `DELETE FROM title_qustions WHERE QuestionID = ${id}`

        const { error } = deleteValidation.validate({ id })

        if (error) {
            console.log('%cQuestionCont.js line:68:', error.message);
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        connection.query(deleteQuestionQuery, (err, result) => {
            if (err) {
                console.log('%cQuestionCont.js line:79: ', err.sqlMessage);
                return res
                    .status(httpCodes.BAD_REQUEST)
                    .send({ continueWork: false, message: err.sqlMessage })
            }

            return res
                .status(httpCodes.OK)
                .send({
                    continueWork: true,
                    id,
                    message: "Question Deleted"
                })
        })
    } catch (error) {
        console.log('%cQuestionCont.js line:62 deleteQuestion error');
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

// exports.updateQuestion