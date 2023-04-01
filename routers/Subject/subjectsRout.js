const router = require('express').Router();

const { saveNewSubject, getAllSubjects } = require('../../controllers/Subject/SubjectsCont');

router
    .post('/save-new-subject', saveNewSubject)
    .get('/get-all-subjects', getAllSubjects)

module.exports = router;