const router = require('express').Router();
const { addNewUser, loginUser, checkUserCookies, userLogout } = require('../../controllers/Users/UserCont');

router
    .post('/login-user', loginUser)
    .post('/save-new-user', addNewUser)
    .get('/check-cookies', checkUserCookies)
    .get('/user-logout', userLogout)

module.exports = router;
