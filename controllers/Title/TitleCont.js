const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const { addNewTitleValidation, getAllTitlesValidation, updateTitleValidation, deleteValidation } = require("../../validation/dashboardValid")

// ---- Save New Title ---- //
exports.saveNewTitle = (req, res) => {
    try {
        const { Title, SubjectID } = req.body

        const { error } = addNewTitleValidation.validate({ Title, SubjectID })

        if (error) {
            console.error('TitleCont.js line:12 validation error of saveNewTitle:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID, Draft) VALUES ("${Title}", "${SubjectID}", true)`

        connection.query(query, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:20 sql error saveNewTitle', err.sqlMessage);
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
        console.error('TitleConst.js line:34 function saveNewTitle', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Get All Titles By Subject Id ---- //
exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const { error } = getAllTitlesValidation.validate({ SubjectID })

        if (error) {
            console.error('TitleCont.js line:46 validation error of getAllTitles:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        connection.query(query, (err, titles) => {
            if (err) {
                console.error('TitleConst.js line:54 sql error getAllTitles', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, titles })
        })
    } catch (error) {
        console.error('TitleConst.js line:61 function getAllTitles', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Update Title ---- //
exports.updateTitle = async (req, res) => {
    try {
        const { id, TitleName } = req.body

        const { error } = updateTitleValidation.validate({ id, TitleName })

        if (error) {
            console.error('TitleConst.js line:73 validation error of updateTitle:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuery = `UPDATE titles_quizes SET Title='${TitleName}' WHERE Title_QuizID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:81 sql error updateTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, id, TitleName, message: "Title Updated" })
        })
    } catch (error) {
        console.error('TitleConst.js line:88 function updateTitle', error);
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

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:112 sql error removeTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            /* ########## 
                ADD REMOVING QUESTION OF THE TITLE
             ########### */
            return res.status(httpCodes.OK).send({ continueWork: true, id, message: "Title Deleted" })
        })
    } catch (error) {
        console.error('TitleConst.js line:122 function removeTitle', error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}