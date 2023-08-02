const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const jwt = require('jwt-simple');

exports.getAllSavedQuizes = async (req, res) => {
    try {
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`UserConst.js line:11 No cookie token of getAllSavedQuizes`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        const getSavedQuzes = `SELECT savedQuizID, Title_QuizID, Title_Name, SubjectName FROM savged_quizes WHERE UserID=${userID}`

        connection.query(getSavedQuzes, (err, quizes) => {
            if (err) {
                console.error('UserConst.js line:21 sql error of getAllSavedQuizes:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            return res.send({ continueWork: true, quizes })
        })
    } catch (error) {
        console.error('SavedQuizes.js line:29 function getAllSavedQuizes', error);
        return res.send({ continueWork: false, message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

exports.saveQuizToFav = async (req, res) => {
    try {
        const { Title_QuizID, Title_Name, SubjectName } = req.body
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`UserConst.js line:41 No cookie token of saveQuizToFav`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        const checkIfAlreadyExist = `SELECT * FROM savged_quizes WHERE UserID = ${userID} AND Title_QuizID = ${Title_QuizID}`

        connection.query(checkIfAlreadyExist, (err, result) => {
            if (err) {
                console.error('SavedQuizes.js line:48 sql error of saveQuizToFav:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            if (result.length >= 1) {
                console.log(`already exist`)
                return res.send({ continueWork: false, message: "Already exist" }).status(httpCodes.BAD_REQUEST)
            }

            const saveToFav = `INSERT INTO savged_quizes (Title_QuizID, UserID, Title_Name, SubjectName) VALUES (${Title_QuizID},${userID},"${Title_Name}", "${SubjectName}")`

            connection.query(saveToFav, (err, result) => {
                if (err) {
                    console.error('SavedQuizes.js line:61 sql error of saveQuizToFav:', err.sqlMessage);
                    return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
                }

                return res.send({ continueWork: true, savedQuizID: result.insertId, Title_QuizID, Title_Name, message: "Title Saved" })
            })
        })
    } catch (error) {
        console.error('SavedQuizes.js line:57 function saveQuizToFav', error);
        return res.send({ continueWork: false, message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

exports.removeFromFav = async (req, res) => {
    try {
        const { savedQuizID } = req.body
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`UserConst.js line:41 No cookie token of saveQuizToFav`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        const deleteQuery = `DELETE FROM savged_quizes WHERE savedQuizID = ${savedQuizID} AND UserID=${userID}`

        connection.query(deleteQuery, (err, result) => {
            if (err) {
                console.error('SavedQuizes.js line:90 sql error of removeFromFav:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            return res.send({ continueWork: true, savedQuizID, message: "Title Removed" })
        })
    } catch (error) {

    }
}