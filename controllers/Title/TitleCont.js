const connection = require("../../connection")

exports.saveNewTitle = (req, res) => {
    try {
        const { TitleName, SubjectID } = req.body

        if (TitleName == undefined || SubjectID == undefined) {
            return res.send({ continue: false, message: "Title or SubjectID are missing" })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID) VALUES ("${TitleName}", "${SubjectID}")`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror TitleCont.js line:11 ', err.sqlMessage);
                return res.send({ continue: false, message: err.sqlMessage })
            }

            return res.send({ continue: true, message: "Subject Saved", TitleName })
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        connection.query(query, (err, result) => {
            if (err) {
                console.log('%cerror SubjectsCont.js line:27 ', err.sqlMessage);
                return res.send({ continue: false, message: err.sqlMessage })
            }

            return res.send({ continue: true, result })
        })
    } catch (error) {
        console.log(error)
    }
}