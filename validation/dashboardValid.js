const Joi = require('joi');

const id = Joi.number().required().greater(0).messages({
    'number.empty': "SubjectID can not be empty",
    'number.greater': "ID must be more than 0"
})

exports.deleteValidation = Joi.object({ // Delete Subject/Title/Question
    id
})

// ---- SUBJECT ---- //
exports.addNewSubjectValidation = Joi.object({ // Add New Subject
    subjectName: Joi.string().min(2).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 2 sybmols",
    }),
})

exports.updateSubjectValidation = Joi.object({ //Update Subject
    SubjectName: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    id: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "ID must be more than 0"
    }),
})

// ---- TITLE ---- //
exports.addNewTitleValidation = Joi.object({ // Add New Title
    Title: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    SubjectID: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "SubjectID must be more than 0"
    }),
})

exports.getAllTitlesValidation = Joi.object({ //Get All Titles
    SubjectID: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "SubjectID must be more than 0"
    }),
})

exports.updateTitleValidation = Joi.object({ // Update Title
    TitleName: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    id: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "ID must be more than 0"
    }),
})

// ---- Questions ---- //
const question = Joi.object({ //Question Object Validation
    QuestionText: Joi.string().min(5).required().messages({
        'string.empty': "QuestionText can not be empty",
        'string.min': "QuestionText must be minimum 5 sybmols",
    }),
    Answer1: Joi.string().min(2).required().messages({
        'string.empty': "Answer1 can not be empty",
        'string.min': "Answer1 must be minimum 2 sybmols",
    }),
    Answer2: Joi.string().min(2).required().messages({
        'string.empty': "Answer2 can not be empty",
        'string.min': "Answer2 must be minimum 2 sybmols",
    }),
    Answer3: Joi.string().min(2).required().messages({
        'string.empty': "Answer3 can not be empty",
        'string.min': "Answer3 must be minimum 2 sybmols",
    }),
    Answer4: Joi.string().min(2).required().messages({
        'string.empty': "Answer4 can not be empty",
        'string.min': "Answer4 must be minimum 2 sybmols",
    }),
    Title_QuizID: Joi.number().required().greater(0).messages({
        'number.empty': "Title_QuizID can not be empty",
        'number.greater': "Title_QuizID must be more than 0"
    }),
    RigthQuestion: Joi.string().required().valid("Answer1", "Answer2", "Answer3", "Answer4").required().messages({
        'string.empty': "RigthQuestion can not be empty",
        'string.only': "RigthQuestion could include only 4 options: Answer1, Answer2, Answer3, Answer4",
    }),
    SubjectID: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "SubjectID must be more than 0"
    }),
})

exports.questionsValidation = Joi.array().items(question) //Array Of Questions Validation

exports.getAllQuestionsaValidation = Joi.object({ //Get All Questions
    Title_QuizID: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "SubjectID must be more than 0"
    }),
})

exports.deleteManyIdsValidation = Joi.array().items(id)

exports.updateQuestionValidation = Joi.object({
    QuestionID: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "SubjectID must be more than 0"
    }),
    QuestionText: Joi.string().min(5).required().messages({
        'string.empty': "QuestionText can not be empty",
        'string.min': "QuestionText must be minimum 5 sybmols",
    }),
    Answer1: Joi.string().min(2).required().messages({
        'string.empty': "Answer1 can not be empty",
        'string.min': "Answer1 must be minimum 2 sybmols",
    }),
    Answer2: Joi.string().min(2).required().messages({
        'string.empty': "Answer2 can not be empty",
        'string.min': "Answer2 must be minimum 2 sybmols",
    }),
    Answer3: Joi.string().min(2).required().messages({
        'string.empty': "Answer3 can not be empty",
        'string.min': "Answer3 must be minimum 2 sybmols",
    }),
    Answer4: Joi.string().min(2).required().messages({
        'string.empty': "Answer4 can not be empty",
        'string.min': "Answer4 must be minimum 2 sybmols",
    }),
    RigthQuestion: Joi.string().required().valid("Answer1", "Answer2", "Answer3", "Answer4").required().messages({
        'string.empty': "RigthQuestion can not be empty",
        'string.only': "RigthQuestion could include only 4 options: Answer1, Answer2, Answer3, Answer4",
    }),
})