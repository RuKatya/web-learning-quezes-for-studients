const Joi = require('joi');

const id = Joi.number().required().greater(0).messages({
    'number.empty': "SubjectID can not be empty",
    'number.greater': "ID must be more than 0"
})

const SubjectName = Joi.string().min(2).required().messages({
    'string.empty': "Subject can not be empty",
    'string.min': "Subject must be at least minimum 2 sybmols",
})

const SubjectID = Joi.number().required().greater(0).messages({
    'number.empty': "SubjectID can not be empty",
    'number.greater': "SubjectID must be more than 0"
})

const QuestionText = Joi.string().min(5).required().messages({
    'string.empty': "QuestionText can not be empty",
    'string.min': "QuestionText must be minimum 5 sybmols",
})

const AnswerValidation = Joi.string().min(2).required().messages({
    'string.empty': "Answer1 can not be empty",
    'string.min': "Answer1 must be minimum 2 sybmols",
})

const Title = Joi.string().min(3).required().messages({
    'string.empty': "Subject can not be empty",
    'string.min': "Subject must be at least minimum 3 sybmols",
})

const Title_QuizID = Joi.number().required().greater(0).messages({
    'number.empty': "Title_QuizID can not be empty",
    'number.greater': "Title_QuizID must be more than 0"
})

const RigthQuestion = Joi.string().required().valid("Answer1", "Answer2", "Answer3", "Answer4").required().messages({
    'string.empty': "RigthQuestion can not be empty",
    'string.only': "RigthQuestion could include only 4 options: Answer1, Answer2, Answer3, Answer4",
})


// Delete Subject/Title/Question
exports.deleteValidation = Joi.object({
    id
})

// Add New Subject/Get All titles To User
exports.subjectNameValidation = Joi.object({
    SubjectName
})

// ---- SUBJECT ---- //
//Update Subject
exports.updateSubjectValidation = Joi.object({
    SubjectName,
    id
})

// ---- TITLE ---- //
exports.addNewTitleValidation = Joi.object({ // Add New Title
    Title,
    SubjectID
})

exports.getAllTitlesValidation = Joi.object({ //Get All Titles
    SubjectID
})

exports.updateTitleValidation = Joi.object({ // Update Title
    TitleName: Joi.string().min(3).required().messages({
        'string.empty': "Subject can not be empty",
        'string.min': "Subject must be at least minimum 3 sybmols",
    }),
    id
})

exports.saveToDraftOrToDraft = Joi.object({
    draft: Joi.boolean().required().messages({
        'boolean.base': 'Only true/false value is valid',
        'string.empty': 'Draft can not be empty'
    }),
    id
})

// ---- Questions ---- //
const question = Joi.object({ //Question Object Validation
    QuestionText,
    Answer1: AnswerValidation,
    Answer2: AnswerValidation,
    Answer3: AnswerValidation,
    Answer4: AnswerValidation,
    Title_QuizID,
    RigthQuestion,
    SubjectID
})

exports.questionsValidation = Joi.array().items(question) //Array Of Questions Validation

exports.getAllQuestionsaValidationByID = Joi.object({ //Get All Questions By ID
    Title_QuizID
})

exports.getAllQuestionsaValidationByName = Joi.object({ //Get All Questions By Name
    Title
})

exports.deleteManyIdsValidation = Joi.array().items(id)

exports.updateQuestionValidation = Joi.object({
    QuestionID: Joi.number().required().greater(0).messages({
        'number.empty': "SubjectID can not be empty",
        'number.greater': "SubjectID must be more than 0"
    }),
    QuestionText,
    Answer1: AnswerValidation,
    Answer2: AnswerValidation,
    Answer3: AnswerValidation,
    Answer4: AnswerValidation,
    RigthQuestion
})