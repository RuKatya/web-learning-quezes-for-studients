const router = require('express').Router();
const { addNewUser, loginUser, checkUserCookies, userLogout, getUserProfile, getAllUsers, getOneUser, deleteOnUser, updateUserRole } = require('../../controllers/Users/UserCont');
const userRole = require('../../middleWare/userRole');

router
    .post('/login-user', loginUser)
    .post('/save-new-user', addNewUser)
    .get('/check-cookies', checkUserCookies)
    .get('/user-logout', userLogout)
    // .get('/get-user-profile', getUserProfile)

    // ---- Admin ---- //
    .get('/get-all-users', userRole, getAllUsers)
    .post('/get-one-user', userRole, getOneUser)
    .delete('/delete-one-user', userRole, deleteOnUser)
    .patch('/update-user-role', userRole, updateUserRole)

module.exports = router;
