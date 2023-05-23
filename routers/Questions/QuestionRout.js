const router = require('express').Router();
const { saveNewQuestions, getAllQuestionsByTitle, deleteQuestion } = require('../../controllers/Question/QuestionCont');

router
    .post('/save-new-questions', saveNewQuestions)
    .post('/get-all-title-questions', getAllQuestionsByTitle)
    .delete('/delete-one-question', deleteQuestion)

module.exports = router;
