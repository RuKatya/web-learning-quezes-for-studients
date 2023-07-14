const router = require('express').Router();
const { saveNewTitle, getAllTitles, removeTitle, updateTitle, getAllTitlesUser, saveDraftOrPublish } = require("../../controllers/Title/TitleCont");
const userRole = require('../../middleWare/userRole');

router
    .post('/get-all-titles', userRole, getAllTitles)
    .post('/save-new-title', userRole, saveNewTitle)
    .patch('/update-title', userRole, updateTitle)
    .patch('/save-draft-or-publish', userRole, saveDraftOrPublish)
    .delete('/remove-title', userRole, removeTitle)
    .post('/get-all-titles-for-user', getAllTitlesUser)

module.exports = router;