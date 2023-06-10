const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const jwt = require('jwt-simple');

exports.getAllSavedQuizes = async (req, res) => {
    try {
        // console.log('bla')
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`UserConst.js line:11 No cookie token of getAllSavedQuizes`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        const getSavedQuzes = `SELECT savedQuizID, Title_QuizID, Title_Name FROM savged_quizes WHERE UserID=${userID}`

        connection.query(getSavedQuzes, (err, quizes) => {
            if (err) {
                console.error('UserConst.js line:21 sql error of getAllSavedQuizes:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            return res.send({ continueWork: true, quizes })
        })
    } catch (error) {
        console.error('UserCont.js line:29 function getAllSavedQuizes', error);
        return res.send({ continueWork: false, message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

exports.saveQuizToFav = async (req, res) => {
    try {
        const { Title_QuizID, Title_Name } = req.body
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`UserConst.js line:11 No cookie token of getAllSavedQuizes`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        // const checkIfAlreadyExist = ``

        const saveToFav = `INSERT INTO savged_quizes (Title_QuizID, UserID, Title_Name) VALUES (${Title_QuizID},${userID},"${Title_Name}")`

        connection.query(saveToFav, (err, result) => {
            if (err) {
                console.error('UserConst.js line:50 sql error of saveQuizToFav:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            res.send({ continueWork: true, savedQuizID: result.insertId, Title_QuizID, Title_Name, message: "Title Saved" })
        })
    } catch (error) {
        console.error('UserCont.js line:57 function saveQuizToFav', error);
        return res.send({ continueWork: false, message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}