const router = require('express').Router();
const { 
  login, 
  signup, 
  getLoggedInUser, 
  updateUser, 
  verifyEmail
} = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');
const { validateSignup, validateLogin } = require('../middleware/validation.middleware');


router.post('/signup', validateSignup, signup)
router.post('/verify-email', verifyEmail)
router.post('/login', validateLogin, login)
router.get('/get-logged-in-user', auth, getLoggedInUser)
router.patch('/update-user', auth, updateUser)

module.exports = router