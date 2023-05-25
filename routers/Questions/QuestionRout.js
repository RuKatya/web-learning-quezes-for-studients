const router = require('express').Router();
const { saveNewQuestions, getAllQuestionsByTitle, deleteQuestion, deleteManyQuestions } = require('../../controllers/Question/QuestionCont');

router
    .post('/save-new-questions', saveNewQuestions)
    .post('/get-all-title-questions', getAllQuestionsByTitle)
    .delete('/delete-one-question', deleteQuestion)
    .delete('/delete-many-question', deleteManyQuestions)

module.exports = router;
