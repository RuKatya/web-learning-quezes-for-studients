const Joi = require('joi');

exports.addNewSubjectValidation = Joi.object({
    subjectName: Joi.string().min(2).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 2 sybmols",
    }),
})