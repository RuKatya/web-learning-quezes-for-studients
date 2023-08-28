const connection = require("../../connection");
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const { userRegValidation, userLogValidation } = require("../../validation/authValid");
const { httpCodes } = require("../../utils/httpStatusCode");
// const { transporter } = require("../../nodeMailer/connectionMailer");
// const { info } = require("../../nodeMailer/mailToUsers");

// ---- Add New User ---- //
exports.addNewUser = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body

        const { error } = userRegValidation.validate({ email, password, confirmPassword, userName })

        if (error) {
            console.error('UserConst.js line:16 validation error of addNewUser:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const hashpass = await bcrypt.hash(password, 10)

        const saveUser = `INSERT INTO users (Email, UserName, UserPassword, UserRole ) VALUES ("${email}", "${userName}","${hashpass}","user")`

        connection.query(saveUser, async (err, result) => {
            if (err) {
                console.error('UserConst.js line:26 sql error addNewUser:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.REQUEST_CONFLICT)
            }

            res.send({ continueWork: true, message: "User Saved" }).status(httpCodes.OK)
        })
    } catch (error) {
        console.error('UserCont.js line:33 function addNewUser', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Login User ---- //
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = userLogValidation.validate({ email, password })

        if (error) {
            console.error('UserConst.js line:45 validation error of loginUser:', error.message)
            return res.send({ continueWork: false, message: error.message }).status(httpCodes.FORBIDDEN)
        }

        const searchUser = `SELECT * FROM users WHERE Email="${email}"`

        connection.query(searchUser, async (err, user) => {
            if (err) {
                console.error('UserConst.js line:53 sql error of loginUser:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            if (user.length == 0) {
                console.log('UserConst.js line:58 User not exist of loginUser')
                return res.send({ continueWork: false, message: "User not exist" }).status(httpCodes.NOT_FOUND)
            }

            const comparePass = await bcrypt.compare(password, user[0].UserPassword)

            if (!comparePass) {
                console.log(`UserConst.js line:65 Password not correct of loginUser`)
                return res.send({ continueWork: false, message: "Password not correct" }).status(httpCodes.UNAUTHORIZED)
            }

            const cookiesData = { userID: user[0].UserID, userRole: user[0].UserRole }

            const token = jwt.encode(cookiesData, process.env.SECRET)
            res.cookie("weblearningtoken", token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true })

            res.send({
                continueWork: true,
                isLogin: true,
                message: "User Login",
                userName: user[0].UserName,
                userRole: user[0].UserRole
            }).status(httpCodes.OK)
        })
    } catch (error) {
        console.error('UserCont.js line:83 function loginUser', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Check User Cookies ---- //
exports.checkUserCookies = async (req, res) => {
    try {
        const { weblearningtoken } = req.cookies

        if (!weblearningtoken) {
            console.log(`UserConst.js line:95 No cookie token of checkUserCookies`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        const userSearch = `SELECT * FROM users WHERE userID=${userID}` // Search the user with the id that saved in cookies

        connection.query(userSearch, async (err, user) => {
            if (err) {
                console.error('UserConst.js line:103 sql error of checkUserCookies:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            if (user.length == 0) {
                console.error('UserConst.js line:113 checkUserCookies: No user');
                return res.send({ continueWork: false, message: "No user" }).status(httpCodes.BAD_REQUEST)
            }

            const cookiesData = { userID: user[0].UserID, userRole: user[0].UserRole }
            const token = jwt.encode(cookiesData, process.env.SECRET)

            res.cookie("weblearningtoken", token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true }) // send data of user to save in cookies

            return res.send({
                continueWork: true,
                isLogin: true,
                message: "User Login",
                userName: user[0].UserName,
                userRole: user[0].UserRole
            }).status(httpCodes.OK)
        })
    } catch (error) {
        console.log('UserCont.js line:124 function checkUserCookies', error);
        return res.send({ continueWork: false, isLogin: false, message: "Login Please" })
    }
}

// ---- User Logout ---- //
exports.userLogout = async (req, res) => {
    try {
        res.clearCookie('weblearningtoken')
        console.log(`out`)
        return res.send({ continueWork: false, isLogin: false }).status(httpCodes.OK)
    } catch (error) {
        console.error('UserCont.js line:132 function userLogout', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Get All Users To Dashboard ---- //
exports.getAllUsers = async (req, res) => {
    try {

        const { weblearningtoken } = req.cookies

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

        if (!weblearningtoken) {
            console.log(`UserConst.js line:95 No cookie token of checkUserCookies`)
            return res.send({ continueWork: false, isLogin: false }).status(httpCodes.NOT_FOUND)
        }

        const getAllUsers = `SELECT UserID, UserName FROM users WHERE UserID !=${userID}`

        connection.query(getAllUsers, (err, users) => {
            if (err) {
                console.error('UserConst.js line:172 sql error of getAllUsers:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            return res.send({ continueWork: true, users }).status(httpCodes.OK)
        })
    } catch (error) {
        console.error('UserCont.js line:179 function getAllUsers', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Get One User For Dashboard ---- //
exports.getOneUser = (req, res) => {
    try {
        const { userID } = req.body

        const userSearch = `SELECT Email, UserName, UserID, UserRole FROM users WHERE userID=${userID}`

        connection.query(userSearch, (err, user) => {
            if (err) {
                console.error('UserConst.js line:203 sql error of getAllUsers:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            res.send({ continueWork: true, user: user[0] })
        })
    } catch (error) {
        console.error('UserCont.js line:179 function getOneUser', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Delete One User ---- //
exports.deleteOnUser = (req, res) => {
    try {
        const { userID } = req.body
        console.log(userID)

        const deleteUser = `DELETE FROM users WHERE UserID = ${userID}`

        connection.query(deleteUser, (err, user) => {
            if (err) {
                console.error('UserConst.js line:223 sql error of deleteOnUser:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            res.send({ continueWork: true, userID })
        })
    } catch (error) {
        console.error('UserCont.js line:238 function deleteOnUser', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}

// ---- Update User Role ---- //
exports.updateUserRole = (req, res) => {
    try {
        const { userId, userRole } = req.body

        console.log(userId, userRole)

        const updateRole = `UPDATE users SET UserRole = "${userRole}" WHERE UserId = ${userId};`

        connection.query(updateRole, (err, user) => {
            if (err) {
                console.error('UserConst.js line:254 sql error of updateUserRole:', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage }).status(httpCodes.BAD_REQUEST)
            }

            res.send({ continueWork: true, userId, userRole, message: "User Role Updated" })
        })
    } catch (error) {
        console.error('UserCont.js line:238 function updateUserRole', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}