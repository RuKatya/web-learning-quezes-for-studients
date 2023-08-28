const connection = require("../../connection")
const { httpCodes } = require("../../utils/httpStatusCode")
const jwt = require('jwt-simple');

exports.saveDoneQuiz = async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        return res.send({ continueWork: false, message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}