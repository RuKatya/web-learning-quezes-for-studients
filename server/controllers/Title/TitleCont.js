const connection = require("../../connection")

exports.saveNewTitle = (req, res) => {
    try {
        const { Title, SubjectID } = req.body

        if (Title == undefined || SubjectID == undefined) {
            return res.send({ continueWork: false, message: "Title or SubjectID are missing" })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID) VALUES ("${Title}", "${SubjectID}")`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror TitleCont.js line:11 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            const numberId = Number(SubjectID)
            return res.send({ continueWork: true, message: "Subject Saved", SubjectID: numberId, Title, Title_QuizID: result.insertId })
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        connection.query(query, (err, titles) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, titles })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateTitle = async (req, res) => {
    try {
        const { id, TitletName } = req.body

        const updateQuery = `UPDATE titles_quizes SET Title='${TitletName}' WHERE Title_QuizID=${id}`

        connection.query(updateQuery, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:47 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            return res.send({ continueWork: true, id, TitletName, message: "Title Updated" })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.removeTitle = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuery = `DELETE FROM titles_quizes WHERE Title_QuizID=${id}`

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:47 ', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            /* ########## 
                ADD QUESTION OF THE TITLE
             ########### */
            return res.send({ continueWork: true, id, message: "Title Deleted" })
        })
    } catch (error) {
        console.log(error)
    }
}