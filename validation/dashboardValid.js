const Joi = require('joi');

exports.deleteValidation = Joi.object({
    id: Joi.number().required().messages({
        'number.empty': "SubjectID can not be empty",
    }),
})

//------SUBJECT---------//
exports.addNewSubjectValidation = Joi.object({
    subjectName: Joi.string().min(2).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 2 sybmols",
    }),
})

exports.updateSubjectValidation = Joi.object({
    SubjectName: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    id: Joi.number().required().messages({
        'number.empty': "SubjectID can not be empty",
    }),
})

//------TITLE-----------//
exports.addNewTitleValidation = Joi.object({
    Title: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    SubjectID: Joi.number().required().messages({
        'number.empty': "SubjectID can not be empty",
    }),
})

exports.getAllTitlesValidation = Joi.object({
    SubjectID: Joi.number().required().messages({
        'number.empty': "SubjectID can not be empty",
    }),
})

exports.updateTitleValidation = Joi.object({
    TitleName: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    id: Joi.number().required().messages({
        'number.empty': "SubjectID can not be empty",
    }),
})
