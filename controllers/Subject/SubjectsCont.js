const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const { addNewSubjectValidation } = require("../../validation/dashboardValid")

exports.saveNewSubject = (req, res) => {
    try {
        const { subjectName } = req.body


        const { error } = addNewSubjectValidation.validate({ subjectName })

        if (error) {
            console.log('%cSubjectsCont.js line:13:', error.message);
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        const query = `INSERT INTO subjects (subjectName) VALUES ("${subjectName}")`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:11 ', err.sqlMessage);
                return res
                    .status(httpCodes.REQUEST_CONFLICT)
                    .send({ continueWork: false, message: err.sqlMessage })
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
        console.error(error)
    }
}

exports.getAllSubjects = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects;`

        connection.query(query, (err, subjects) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, subjects })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateSubject = async (req, res) => {
    try {
        const { id, SubjectName } = req.body

        const updateQuery = `UPDATE subjects SET subjectName='${SubjectName}' WHERE SubjectID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:47 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, id, SubjectName, message: "Subject Updated" })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.removeSubject = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuery = `DELETE FROM subjects WHERE SubjectID=${id}`

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:47 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            /* ########## 
                ADD REMOVING TITLES AND QUESTION OF THE SUBJECT
             ########### */
            return res.send({ continueWork: true, id, message: "Subject Deleted" })
        })
    } catch (error) {
        console.log(error)
    }
}