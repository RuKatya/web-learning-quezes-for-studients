const { transporter } = require("./connectionMailer");

exports.info = async (toUserEmail) => {
    return await transporter.sendMail({
        from: '"Web Learning 👻" <web.learning.site@gmail.com>', // sender address
        to: toUserEmail, // list of receivers
        subject: "Welcome to Web Learning Site ✔", // Subject line
        text: "Welcome", // plain text body
        html: "<b>Welcome</b>", // html body
    })
};