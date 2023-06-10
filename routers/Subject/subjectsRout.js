const router = require('express').Router();
const { saveNewSubject, getAllSubjects, removeSubject, updateSubject } = require('../../controllers/Subject/SubjectsCont');
const userRole = require('../../middleWare/userRole');

router
    .get('/get-all-subjects', userRole, getAllSubjects)
    .post('/save-new-subject', userRole, saveNewSubject)
    .patch('/update-subject', userRole, updateSubject)
    .delete('/remove-subject', userRole, removeSubject)

module.exports = router;