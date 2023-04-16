const router = require('express').Router();

const { saveNewSubject, getAllSubjects, removeSubject } = require('../../controllers/Subject/SubjectsCont');

router
    .post('/save-new-subject', saveNewSubject)
    .get('/get-all-subjects', getAllSubjects)
    .delete('/remove-subject', removeSubject)

module.exports = router;