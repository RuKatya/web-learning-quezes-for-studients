const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const {
    deleteValidation,
    questionsValidation,
    deleteManyIdsValidation,
    updateQuestionValidation,
    getAllQuestionsaValidationByID,
    getAllQuestionsaValidationByName
} = require("../../validation/dashboardValid")

// ---- Saves Question ---- //
exports.saveNewQuestions = (req, res) => {
    try {
        const { questions, draft } = req.body
        const TitleID = questions[0].Title_QuizID

        const { error } = questionsValidation.validate(questions)

        if (error) {
            console.error('QuestionCont.js line:14 validation error of saveNewQuestions:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const questionsToServer = questions.map(obj =>
            Object.values(obj)
        )

        const query = `INSERT INTO title_qustions (QuestionText, Answer1, Answer2, Answer3, Answer4, Title_QuizID, RigthQuestion, SubjectID) VALUES ?`

        connection.query(query, [questionsToServer], (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:26 sql error saveNewQuestions', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            const saveTitleDraft = `UPDATE titles_quizes SET Draft = ${draft} WHERE Title_QuizID = ${TitleID}`

            connection.query(saveTitleDraft, err => {
                if (err) {
                    console.error('SubjectsCont.js line:34 sql error saveNewQuestions', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
                }
            })

            const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${TitleID}`

            connection.query(getQuestions, (err, questions) => {
                if (err) {
                    console.error('SubjectsCont.js line:43 sql error saveNewQuestions', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
                }

                return res.send({ continueWork: true, message: "Saved", questions }).status(httpCodes.OK)
            })
        })
    } catch (error) {
        console.log('QuestionCont.js line:24 saveNewQuestions error', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Get All Questions By Title ID ---- //
exports.getAllQuestionsByTitleID = async (req, res) => {
    try {
        const { Title_QuizID } = req.body

        const { error } = getAllQuestionsaValidationByID.validate({ Title_QuizID })

        if (error) {
            console.error('QuestionCont.js line:67 validation error of getAllQuestionsByTitle:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${Title_QuizID}`

        connection.query(getQuestions, (err, questions) => {
            if (err) {
                console.error('QuestionCont.js line:72 sql error getAllQuestionsByTitle', err.sqlMessage);
                return res.send({ continueWork: false, message: err.message }).status(httpCodes.FORBIDDEN)
            }

            return res.send({ continueWork: true, questions }).status(httpCodes.OK)
        })
    } catch (error) {
        console.log('QuestionCont.js line:50 getAllQuestionsByTitle error', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Get All Questions By Title Name ---- //
exports.getAllQuestionsByTitle = async (req, res) => {
    try {
        const { Title } = req.body

        const { error } = getAllQuestionsaValidationByName.validate({ Title })

        if (error) {
            console.error('QuestionCont.js line:67 validation error of getAllQuestionsByTitle:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const getTitle = `SELECT * FROM titles_quizes WHERE Title = "${Title}"`

        connection.query(getTitle, (err, title) => {
            if (err) {
                console.error('QuestionCont.js line:7107 sql error getAllQuestionsByTitle', err.sqlMessage);
                return res.send({ continueWork: false, message: err.message }).status(httpCodes.FORBIDDEN)
            }

            const titleID = title[0].Title_QuizID

            const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${titleID}`

            connection.query(getQuestions, (err, questions) => {
                if (err) {
                    console.error('QuestionCont.js line:72 sql error getAllQuestionsByTitle', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.message }).status(httpCodes.FORBIDDEN)
                }

                return res.send({ continueWork: true, questions, titleID: title[0].Title_QuizID }).status(httpCodes.OK)
            })
        })
    } catch (error) {
        console.log('QuestionCont.js line:50 getAllQuestionsByTitle error', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Update Question ---- //
exports.updateQuestion = async (req, res) => {
    try {
        const { QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion } = req.body

        const { error } = updateQuestionValidation.validate({ QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion })

        if (error) {
            console.error('QuestionCont.js line:67 validation error of getAllQuestionsByTitle:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const updateQuestion = `UPDATE title_qustions SET QuestionText = '${QuestionText}', Answer1 = '${Answer1}', Answer2 = '${Answer2}', Answer3 = '${Answer3}', Answer4 = '${Answer4}', RigthQuestion = '${RigthQuestion}' WHERE QuestionID = ${QuestionID};`

        connection.query(updateQuestion, (err, result) => {
            if (err) {
                console.error('QuestionCont.js line:72 sql error getAllQuestionsByTitle', err.sqlMessage);
                return res.send({ continueWork: false, message: err.message }).status(httpCodes.FORBIDDEN)
            }

            res.send({ continueWork: true, message: "Question Updated", QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion })
        })
    } catch (error) {
        console.log('QuestionCont.js line:110 updateQuestion error', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Delete Question ---- //
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.body

        const { error } = deleteValidation.validate({ id })

        if (error) {
            console.error('QuestionCont.js line:97 validation error of deleteQuestion:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const deleteQuestionQuery = `DELETE FROM title_qustions WHERE QuestionID = ${id}`

        connection.query(deleteQuestionQuery, (err, result) => {
            if (err) {
                console.error('QuestionCont.js line:103 sql error deleteQuestion', err.sqlMessage);
                return res.send({ continueWork: false, message: err.message }).status(httpCodes.FORBIDDEN)
            }

            return res.send({ continueWork: true, id, message: "Question Deleted" }).status(httpCodes.OK)
        })
    } catch (error) {
        console.log('QuestionCont.js line:110 deleteQuestion error', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Delete Many Question ---- //
exports.deleteManyQuestions = async (req, res) => {
    try {
        const { ids } = req.body

        const { error } = deleteManyIdsValidation.validate(ids)

        if (error) {
            console.error('QuestionCont.js line:97 validation error of deleteQuestion:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const deleteMany = `DELETE FROM title_qustions WHERE QuestionID IN (${ids})`

        connection.query(deleteMany, (err, result) => {
            if (err) {
                console.error('QuestionCont.js line:124 sql error deleteManyQuestions', err.sqlMessage);
                return res.send({ continueWork: false, message: err.message }).status(httpCodes.FORBIDDEN)
            }

            return res.send({ continueWork: true, ids, message: "Questions Deleted" }).status(httpCodes.OK)
        })
    } catch (error) {
        console.log('QuestionCont.js line:110 deleteQuestion error', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}



