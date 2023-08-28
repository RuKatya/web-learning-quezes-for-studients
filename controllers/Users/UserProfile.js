const connection = require("../../connection");
const jwt = require('jwt-simple');
const { httpCodes } = require("../../utils/httpStatusCode");

// ---- User Profile ---- //
exports.getUserProfile = async (req, res) => {
    try {
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        const userSearch = `SELECT Email, UserName FROM users WHERE userID=${userID}`

        connection.query(userSearch, (err, user) => {
            if (err) {
                console.error('UserConst.js line:152 sql error of getUserProfile:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            return res.send({ continueWork: true, userName: user[0].UserName, email: user[0].Email }).status(httpCodes.OK)
        })
    } catch (error) {
        console.error('UserCont.js line:132 function getUserProfile', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- User Update UserName ---- //
exports.updateUserUserName = async (req, res) => {
    const { weblearningtoken } = req.cookies
    const {newUserName} = req.body

    const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

    // const userSearch = `SELECT Email, UserName FROM users WHERE userID=${userID}`
    const updateUserName = `UPDATE table_name
    SET column1 = value1, column2 = value2, ...
    WHERE condition;`

    connection.query()
}
