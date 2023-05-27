const router = require('express').Router();
const { saveNewQuestions, getAllQuestionsByTitle, deleteQuestion, deleteManyQuestions, updateQuestion } = require('../../controllers/Question/QuestionCont');

router
    .post('/save-new-questions', saveNewQuestions)
    .post('/get-all-title-questions', getAllQuestionsByTitle)
    .patch('/update-question', updateQuestion)
    .delete('/delete-one-question', deleteQuestion)
    .delete('/delete-many-question', deleteManyQuestions)

module.exports = router;
