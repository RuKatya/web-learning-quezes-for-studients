const router = require('express').Router();
const { addNewUser, loginUser, checkUserCookies } = require('../../controllers/Users/UserCont');

router
    .post('/login-user', loginUser)
    .post('/save-new-user', addNewUser)
    .get('/check-cookies', checkUserCookies)

module.exports = router;
