const connection = require("../../connection")
const { addNewTitleValidation, getAllTitlesValidation, updateTitleValidation, deleteValidation } = require("../../validation/dashboardValid")

exports.saveNewTitle = (req, res) => {
    try {
        const { Title, SubjectID } = req.body

        const { error } = addNewTitleValidation.validate({ Title, SubjectID })

        if (error) {
            console.log('%cSubjectsCont.js line:13:', error.message);
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID, Draft) VALUES ("${Title}", "${SubjectID}", true)`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror TitleCont.js line:11 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({
                continueWork: true,
                message: "Subject Saved",
                SubjectID: Number(SubjectID),
                Title,
                Title_QuizID: result.insertId,
                Draft: 1
            })
        })
    } catch (error) {
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const { error } = getAllTitlesValidation.validate({ SubjectID })

        if (error) {
            console.log('%cSubjectsCont.js line:13:', error.message);
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        connection.query(query, (err, titles) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            // console.log(titles)
            return res.send({ continueWork: true, titles })
        })
    } catch (error) {
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

exports.updateTitle = async (req, res) => {
    try {
        const { id, TitleName } = req.body

        const { error } = updateTitleValidation.validate({ id, TitleName })

        if (error) {
            console.log('%cSubjectsCont.js line:13:', error.message);
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        const updateQuery = `UPDATE titles_quizes SET Title='${TitleName}' WHERE Title_QuizID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:47 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, id, TitleName, message: "Title Updated" })
        })
    } catch (error) {
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

exports.removeTitle = async (req, res) => {
    try {
        const { id } = req.body

        const { error } = deleteValidation.validate({ id })

        if (error) {
            console.log('%cSubjectsCont.js line:13:', error.message);
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        const deleteQuery = `DELETE FROM titles_quizes WHERE Title_QuizID=${id}`

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:47 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            /* ########## 
                ADD REMOVING QUESTION OF THE TITLE
             ########### */
            return res.send({ continueWork: true, id, message: "Title Deleted" })
        })
    } catch (error) {
        console.error(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}