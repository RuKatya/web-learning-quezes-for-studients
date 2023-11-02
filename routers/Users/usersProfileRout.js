const router = require('express').Router();
const { getUserProfile, updateUserUserName } = require('../../controllers/Users/UserProfile');

router
    .get('/get-user-profile', getUserProfile)
    .post('/update-user-profile', updateUserUserName)

module.exports = router;