const router = require('express').Router();

const { saveNewSubject, getAllSubjects, removeSubject, updateSubject } = require('../../controllers/Subject/SubjectsCont');

router
    .post('/save-new-subject', saveNewSubject)
    .post('/update-subject', updateSubject)
    .get('/get-all-subjects', getAllSubjects)
    .delete('/remove-subject', removeSubject)

module.exports = router;