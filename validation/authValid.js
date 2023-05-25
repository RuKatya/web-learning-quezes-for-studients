const Joi = require('joi');

exports.userRegValidation = Joi.object({
    userName: Joi.string().min(2).max(25).required().messages({
        'string.empty': "Name can not be empty",
        'string.min': "Name can be maximun 2 sybmols",
        'string.max': "Name can be maximun 25 sybmols",
    }),
    email: Joi.string().email().messages({
        'string.email': "Incorecct email",
        'string.empty': "E-mail can not be empty",
    }),
    password: Joi.string().min(6).pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')).message({
        'string.pattern.base': "Password must include letters and numbers and at least one special character !@#$%^&* and without spaces",
        'string.min': "Password must be at least 6 sybmols",
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': "Passwords not same",
    })
})

exports.userLogValidation = Joi.object({
    email: Joi.string().email().messages({
        'string.email': "Incorecct email",
        'string.empty': "E-mail can not be empty",
    }),
    password: Joi.string().min(6).pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')).message({
        'string.pattern.base': "Password must include letters and numbers and at least one special character !@#$%^&* and without spaces",
        'string.min': "Password must be at least 6 sybmols",
    }),
})