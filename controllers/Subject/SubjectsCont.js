const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const { addNewSubjectValidation, updateSubjectValidation, deleteValidation } = require("../../validation/dashboardValid")

// ---- Save New Subject ---- //
exports.saveNewSubject = (req, res) => {
    try {
        const { subjectName } = req.body

        const { error } = addNewSubjectValidation.validate({ subjectName })

        if (error) {
            console.error('SubjectsCont.js line:16 validation error of saveNewSubject:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `INSERT INTO subjects (subjectName) VALUES ("${subjectName}")`

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
                    SubjectName: subjectName
                })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:37 function saveNewSubject', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Get All Subjects ---- //
exports.getAllSubjects = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects;`

        connection.query(query, (err, subjects) => {
            if (err) {
                console.error('SubjectsCont.js line:49 sql error getAllSubjects', err.sqlMessage);
                return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: err.sqlMessage })
            }

            return res
                .status(httpCodes.OK)
                .send({ continueWork: true, subjects })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:60 function getAllSubjects', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Update Subject ---- //
exports.updateSubject = async (req, res) => {
    try {
        const { id, SubjectName } = req.body

        const { error } = updateSubjectValidation.validate({ id, SubjectName })

        if (error) {
            console.error('SubjectsCont.js line:73 validation error of updateSubject:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuery = `UPDATE subjects SET subjectName='${SubjectName}' WHERE SubjectID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:86 sql error updateSubject', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            return res
                .status(httpCodes.OK)
                .send({ continueWork: true, id, SubjectName, message: "Subject Updated" })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:97 function updateSubject', error);
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
            console.log('%cSubjectsCont.js line:13:', error.message);
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:123 sql error removeSubject', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            /* ########## 
                ADD REMOVING TITLES AND QUESTION OF THE SUBJECT
             ########### */
            return res
                .status(httpCodes.OK)
                .send({ continueWork: true, id, message: "Subject Deleted" })
        })
    } catch (error) {
        console.error('SubjectsCont.js line:137 function removeSubject', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}