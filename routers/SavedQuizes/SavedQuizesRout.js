const router = require('express').Router();
const { getAllSavedQuizes, saveQuizToFav, removeFromFav } = require('../../controllers/SavedQuizes/SavedQuizes');

router
    .get('/get-all-saved-quizes', getAllSavedQuizes)
    .post('/save-to-quizes', saveQuizToFav)
    .delete('/remove-from-quizes', removeFromFav)

module.exports = router;