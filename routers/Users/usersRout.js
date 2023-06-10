const router = require('express').Router();
const { addNewUser, loginUser, checkUserCookies, userLogout, getUserProfile, getAllUsers, getOneUser } = require('../../controllers/Users/UserCont');

router
    .post('/login-user', loginUser)
    .post('/save-new-user', addNewUser)
    .get('/check-cookies', checkUserCookies)
    .get('/user-logout', userLogout)
    .get('/get-user-profile', getUserProfile)
    .get('/get-all-users', getAllUsers)
    .post('/get-one-user', getOneUser)

module.exports = router;
