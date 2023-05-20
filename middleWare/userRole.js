const { httpCodes } = require("../utils/httpStatusCode");
const jwt = require('jwt-simple');

module.exports = async (req, res, next) => {
    const { weblearningtoken } = req.cookies;

    const { userRole } = await jwt.decode(weblearningtoken, process.env.SECRET)

    if (userRole !== "admin") {
        console.log(`User Not authorize`)
        return res
            .status(httpCodes.UNAUTHORIZED)
            .send({ continueWork: false, message: "You can not do it" })
    }

    next()
}