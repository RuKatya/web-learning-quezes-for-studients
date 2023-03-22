const router = require('express').Router();

const { getQuizesSubject } = require('../controllers/quizesCont');

router
    .post('/get-all-quizes', getQuizesSubject)

module.exports = router;