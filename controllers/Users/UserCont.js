const connection = require("../../connection");
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const { userRegValidation, userLogValidation } = require("../../validation/authValid");
const { httpCodes } = require("../../utils/httpStatusCode");
// const { transporter } = require("../../nodeMailer/connectionMailer");
// const { info } = require("../../nodeMailer/mailToUsers");

exports.addNewUser = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body

        const { error } = userRegValidation.validate({ email, password, confirmPassword, userName })

        if (error) {
            console.log('UserConst.js line:12:', error.message)
            return res
                .status(httpCodes.FORBIDDEN)
                .send({
                    continueWork: false,
                    message: error.message
                })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const saveUser = `INSERT INTO users (Email, UserName, UserPassword, UserRole ) VALUES ("${email}", "${userName}","${hashpass}","user")`

        connection.query(saveUser, async (err, result) => {
            if (err) {
                console.log('UserConst.js line:11', err.sqlMessage);
                return res
                    .status(httpCodes.REQUEST_CONFLICT)
                    .send({
                        continueWork: false,
                        message: err.sqlMessage
                    })
            }

            res
                .status(httpCodes.OK)
                .send({
                    continueWork: true,
                    message: "User Saved"
                })
        })
    } catch (error) {
        console.log('error UserCont.js line:35 function addNewUser');
        console.log(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = userLogValidation.validate({ email, password })

        if (error) {
            console.log('UserConst.js line:43:', error.message)
            return res
                .status(httpCodes.FORBIDDEN)
                .send({ continueWork: false, message: error.message })
        }

        const searchUser = `SELECT * FROM users WHERE Email="${email}"`

        connection.query(searchUser, async (err, user) => {
            if (err) {
                console.log(err.sqlMessage);
                return res
                    .status(httpCodes.BAD_REQUEST)
                    .send({ continueWork: false, message: err.sqlMessage })
            }

            if (user.length == 0) {
                console.log('%cUserCont.js line:60 User not exist');
                return res
                    .status(httpCodes.NOT_FOUND)
                    .send({
                        continueWork: false,
                        message: "User not exist"
                    })
            }

            const comparePass = await bcrypt.compare(password, user[0].UserPassword)

            if (!comparePass) {
                console.log(`UserConst.js line:59 Password not correct`)
                return res
                    .status(httpCodes.UNAUTHORIZED)
                    .send({ continueWork: false, message: "Password not correct" })
            }

            console.log(user[0])

            const cookiesData = {
                userID: user[0].UserID,
                userRole: user[0].UserRole
            }

            const token = jwt.encode(cookiesData, process.env.SECRET)
            res.cookie("weblearningtoken", token, {
                maxAge: 1000 * 60 * 60 * 3,
                httpOnly: true
            })

            res
                .status(httpCodes.OK)
                .send({
                    continueWork: true,
                    isLogin: true,
                    message: "User Login",
                    userName: user[0].UserName,
                    userRole: user[0].UserRole,
                })
        })
    } catch (error) {
        console.log('error UserCont.js line:85 function loginUser');
        console.log(error)
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

exports.checkUserCookies = async (req, res) => {
    try {
        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`No cookie token`)
            return res
                .status(httpCodes.NOT_FOUND)
                .send({ continueWork: false, isLogin: false })
        }

        const userSearch = `SELECT * FROM users WHERE userID=${userID}`

        connection.query(userSearch, async (err, user) => {
            if (err) {
                console.log(err.sqlMessage);
                return res
                    .status(httpCodes.BAD_REQUEST)
                    .send({ continueWork: false, message: err.sqlMessage })
            }

            const cookiesData = {
                userID: user[0].UserID,
                userRole: user[0].UserRole
            }

            const token = jwt.encode(cookiesData, process.env.SECRET)

            res.cookie(
                "weblearningtoken",
                token,
                { maxAge: 1000 * 60 * 60 * 3, httpOnly: true })

            res.status(httpCodes.OK).send({
                continueWork: true,
                isLogin: true,
                message: "User Login",
                userName: user[0].UserName,
                userRole: user[0].UserRole
            })
        })
    } catch (error) {
        console.log('error UserCont.js line:94 function checkUserCookies');
        console.log(error.message)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({
                continueWork: false,
                isLogin: false,
                message: "Login Please"
            })
    }
}

exports.userLogout = async (req, res) => {
    console.log(`out`)
    try {
        res.clearCookie('weblearningtoken')
        return res
            .status(httpCodes.OK)
            .send({ continueWork: false, isLogin: false })
    } catch (error) {
        console.log('error UserCont.js line:130 function userLogout');
        console.log(error)
        return res
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Server Feiled, try again" })
    }
}