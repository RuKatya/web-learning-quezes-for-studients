const router = require('express').Router();
const { addNewUser, loginUser } = require('../../controllers/Users/UserCont');

router
    .post('/login-user', loginUser)
    .post('/save-new-user', addNewUser)

module.exports = router;
