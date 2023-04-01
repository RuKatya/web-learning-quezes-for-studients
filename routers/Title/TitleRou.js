const router = require('express').Router();
const { saveNewTitle, getAllTitles } = require("../../controllers/Title/TitleCont");

router
    .post('/save-new-title', saveNewTitle)
    .post('/get-all-titles', getAllTitles)

module.exports = router;
