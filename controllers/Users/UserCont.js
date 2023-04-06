const connection = require("../../connection");
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const { userRegValidation, userLogValidation } = require("../../validation/authValid");
// const { transporter } = require("../../nodeMailer/connectionMailer");
// const { info } = require("../../nodeMailer/mailToUsers");

exports.addNewUser = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body

        console.log(email, confirmPassword, password, userName)

        const { error } = userRegValidation.validate({ email, password, confirmPassword, userName })

        if (error) {
            console.log('UserConst.js line:12:', error.message)
            return res.send({ continueWork: false, message: error.message })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const saveUser = `INSERT INTO users (Email, UserName, UserPassword, UserRole ) VALUES ("${email}", "${userName}","${hashpass}","user")`

        connection.query(saveUser, async (err, result) => {
            if (err) {
                console.log('UserConst.js line:11', err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            // await info(email)
            res.send({ continueWork: true, message: "User Saved" })
        })
    } catch (error) {
        console.log('error UserCont.js line:32');
        console.log(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = userLogValidation.validate({ email, password })

        if (error) {
            console.log('UserConst.js line:43:', error.message)
            return res.send({ continueWork: false, message: error.message })
        }

        const searchUser = `SELECT * FROM users WHERE Email="${email}"`

        connection.query(searchUser, async (err, user) => {
            if (err) {
                console.log(err.sqlMessage);
                return res.send({ continueWork: false, message: err.sqlMessage })
            }

            console.log(user)

            if (user.length == 0) {
                console.log('%cUserCont.js line:60 User not exist');
                return res.send({ continueWork: false, message: "User not exist" })
            }

            const comparePass = await bcrypt.compare(password, user[0].UserPassword)

            if (!comparePass) {
                console.log(`UserConst.js line:59 Password not correct`)
                return res.send({ continueWork: false, message: "Password not correct" })
            }

            const cookiesData = { userID: user[0].UserID }
            const token = jwt.encode(cookiesData, process.env.SECRET)
            res.cookie("web-learning-token", token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true })
            res.send({
                continueWork: true,
                isLogin: true,
                message: "User Login",
                userName: user[0].UserName,
                userRole: user[0].UserRole
            })
        })
    } catch (error) {
        console.log('error UserCont.js line:77');
        console.log(error)
    }
}