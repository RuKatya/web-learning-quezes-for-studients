const router = require('express').Router();
const { getUserProfile } = require('../../controllers/Users/UserProfile');
const userRole = require('../../middleWare/userRole');

router
    .get('/get-user-profile', getUserProfile)

module.exports = router;