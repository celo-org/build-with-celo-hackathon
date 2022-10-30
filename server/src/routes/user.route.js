const router = require('express').Router();
const { login, signup, getLoggedInUser, updateUser } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');
const { validateSignup, validateLogin } = require('../middleware/validation.middleware');


router.post('/signup', validateSignup, signup)
router.post('/login', validateLogin, login)
router.get('/getLoggedInUser', auth, getLoggedInUser)
router.patch('/updateUser', auth, updateUser)

module.exports = router