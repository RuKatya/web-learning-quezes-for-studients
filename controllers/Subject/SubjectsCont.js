const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const { updateSubjectValidation, deleteValidation, subjectNameValidation } = require("../../validation/dashboardValid")

// ---- Save New Subject ---- //
exports.saveNewSubject = (req, res) => {
    try {
        const { SubjectName } = req.body

        const { error } = subjectNameValidation.validate({ SubjectName })

        if (error) {
            console.error('SubjectsCont.js line:13 validation error of saveNewSubject:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `INSERT INTO subjects (subjectName) VALUES ("${SubjectName}")`

        connection.query(query, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:21 sql error saveNewSubject', err.sqlMessage);
                return res.status(httpCodes.REQUEST_CONFLICT).send({ continueWork: false, message: err.sqlMessage })
            }

            return res
                .status(httpCodes.OK)
                .send({
                    continueWork: true,
                    message: "Subject Saved",
                    SubjectID: result.insertId,
                    SubjectName
                })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:35 function saveNewSubject', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Get All Subjects For Admin---- //
exports.getAllSubjects = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects;`

        connection.query(query, (err, subjects) => {
            if (err) {
                console.error('SubjectsCont.js line:47 sql error getAllSubjects', err.sqlMessage);
                return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: err.sqlMessage })
            }

            return res
                .status(httpCodes.OK)
                .send({ continueWork: true, subjects })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:56 function getAllSubjects', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Update Subject ---- //
exports.updateSubject = async (req, res) => {
    try {
        const { id, SubjectName } = req.body

        const { error } = updateSubjectValidation.validate({ id, SubjectName })

        if (error) {
            console.error('SubjectsCont.js line:69 validation error of updateSubject:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuery = `UPDATE subjects SET subjectName='${SubjectName}' WHERE SubjectID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:77 sql error updateSubject', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            return res
                .status(httpCodes.OK)
                .send({ continueWork: true, id, SubjectName, message: "Subject Updated" })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:86 function updateSubject', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Remove Subject ---- //
exports.removeSubject = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuery = `DELETE FROM subjects WHERE SubjectID=${id}`

        const { error } = deleteValidation.validate({ id })

        if (error) {
            console.log('SubjectsCont.js line:101 validation error of removeSubject:', error.message);
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:107 sql error removeSubject', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            const deleteAllTitles = `DELETE FROM titles_quizes WHERE SubjectID=${id}`

            connection.query(deleteAllTitles, (err, deletedQuestions) => {
                if (err) {
                    console.error('TitleConst.js line:115 sql error removeSubject', err.sqlMessage);
                    return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
                }

                const deleteAllQuestions = `DELETE FROM title_qustions WHERE SubjectID=${id}`

                connection.query(deleteAllQuestions, (err, deletedQuestions) => {
                    if (err) {
                        console.error('TitleConst.js line:123 sql error removeSubject', err.sqlMessage);
                        return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
                    }

                    return res
                        .status(httpCodes.OK)
                        .send({ continueWork: true, id, message: "Subject Deleted" })
                })
            })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:134 function removeSubject', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}