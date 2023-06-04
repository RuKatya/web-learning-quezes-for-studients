const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const { addNewTitleValidation, getAllTitlesValidation, updateTitleValidation, deleteValidation, saveToDraftOrToDraft, subjectNameValidation } = require("../../validation/dashboardValid")

// ---- Save New Title ---- //
exports.saveNewTitle = (req, res) => {
    try {
        const { Title, SubjectID } = req.body

        const { error } = addNewTitleValidation.validate({ Title, SubjectID })

        if (error) {
            console.error('TitleCont.js line:1 validation error of saveNewTitle:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID, Draft) VALUES ("${Title}", "${SubjectID}", true)`

        connection.query(query, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:21 sql error saveNewTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            return res.status(httpCodes.OK).send({
                continueWork: true,
                message: "Subject Saved",
                SubjectID: Number(SubjectID),
                Title,
                Title_QuizID: result.insertId,
                Draft: 1
            })
        })
    } catch (error) {
        console.error('TitleConst.js line:35 function saveNewTitle', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Get All Titles By Subject Id ---- //
exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const { error } = getAllTitlesValidation.validate({ SubjectID })

        if (error) {
            console.error('TitleCont.js line:48 validation error of getAllTitles:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        connection.query(query, (err, titles) => {
            if (err) {
                console.error('TitleConst.js line:56 sql error getAllTitles', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, titles })
        })
    } catch (error) {
        console.error('TitleConst.js line:63 function getAllTitles', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Update Title ---- //
exports.updateTitle = async (req, res) => {
    try {
        const { id, TitleName } = req.body

        const { error } = updateTitleValidation.validate({ id, TitleName })

        if (error) {
            console.error('TitleConst.js line:76 validation error of updateTitle', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuery = `UPDATE titles_quizes SET Title='${TitleName}' WHERE Title_QuizID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:84 sql error updateTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, id, TitleName, message: "Title Updated" })
        })
    } catch (error) {
        console.error('TitleConst.js line:91 function updateTitle', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Remove Title ---- //
exports.removeTitle = async (req, res) => {
    try {
        const { id } = req.body

        const { error } = deleteValidation.validate({ id })

        if (error) {
            console.error('TitleConst.js line:104 validation error of removeTitle:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const deleteQuery = `DELETE FROM titles_quizes WHERE Title_QuizID=${id}`

        connection.query(deleteQuery, (err, deletedTitles) => {
            if (err) {
                console.error('TitleConst.js line:112 sql error removeTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            const deleteAllQuestions = `DELETE FROM title_qustions WHERE Title_QuizID=${id}`

            connection.query(deleteAllQuestions, (err, deletedQuestions) => {
                if (err) {
                    console.error('TitleConst.js line:120 sql error removeTitle', err.sqlMessage);
                    return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
                }

                return res.status(httpCodes.OK).send({ continueWork: true, id, message: "Title Deleted" })
            })
        })
    } catch (error) {
        console.error('TitleConst.js line:128 function removeTitle', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Save Draft or Publish the Title ---- //
exports.saveDraftOrPublish = async (req, res) => {
    try {
        const { draft, id } = req.body

        const { error } = saveToDraftOrToDraft.validate({ draft, id })

        if (error) {
            console.error('TitleConst.js line:141 validation error of saveDraftOrPublish:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const chengeDraft = `UPDATE titles_quizes SET Draft = ${draft} WHERE Title_QuizID=${id}`

        connection.query(chengeDraft, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:140 sql error saveDraftOrPublish', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            return res.status(httpCodes.OK).send({ continueWork: true, id, Draft: draft === true ? 1 : 0, message: draft === true ? "Title Saved as Draft" : "Title Published" })
        })

    } catch (error) {
        console.error('TitleConst.js line:157 function saveDraftOrPublish', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Get All Title For User ---- //
exports.getAllTitlesUser = async (req, res) => {
    try {
        const { SubjectName } = req.body

        const { error } = subjectNameValidation.validate({ SubjectName })

        if (error) {
            console.error('TitleConst.js line:170 validation error of getAllTitlesUser:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const selectSubject = `SELECT * FROM subjects WHERE SubjectName = '${SubjectName}'`

        connection.query(selectSubject, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:178 sql error getAllTitlesUser', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            const SubjectID = result[0].SubjectID
            const getAllTitles = `SELECT * FROM titles_quizes WHERE SubjectID = '${SubjectID}' AND Draft = 0`

            connection.query(getAllTitles, (err, result) => {
                if (err) {
                    console.error('TitleConst.js line:187 sql error getAllTitlesUser', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
                }

                return res.status(httpCodes.OK).send({ continueWork: true, result })
            })
        })
    } catch (error) {
        console.error('TitleConst.js line:195 function getAllTitlesUser', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}