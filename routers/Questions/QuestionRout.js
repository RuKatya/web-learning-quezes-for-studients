const router = require('express').Router();
const { saveNewQuestions, getAllQuestionsByTitle } = require('../../controllers/Question/QuestionCont');

router
    .post('/save-new-questions', saveNewQuestions)
    .post('/get-all-title-questions', getAllQuestionsByTitle)

module.exports = router;
