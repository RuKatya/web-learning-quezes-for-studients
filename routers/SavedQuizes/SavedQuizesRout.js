const router = require('express').Router();
const { getAllSavedQuizes, saveQuizToFav } = require('../../controllers/SavedQuizes/SavedQuizes');

router
    .get('/get-all-saved-quizes', getAllSavedQuizes)
    .post('/save-to-quizes', saveQuizToFav)

module.exports = router;