const router = require('express').Router();

const { getAllSubjects } = require('../controllers/subjectsCont');

router
    .get('/get-all-subjects', getAllSubjects)

module.exports = router;