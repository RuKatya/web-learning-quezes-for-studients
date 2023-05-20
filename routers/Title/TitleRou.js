const router = require('express').Router();
const { saveNewTitle, getAllTitles, removeTitle, updateTitle } = require("../../controllers/Title/TitleCont");
const userRole = require('../../middleWare/userRole');

router
    .post('/get-all-titles', userRole, getAllTitles)
    .post('/save-new-title', userRole, saveNewTitle)
    .patch('/update-title', userRole, updateTitle)
    .delete('/remove-title', userRole, removeTitle)

module.exports = router;