const router = require('express').Router()

const signupValidator = require('../validator/auth/signupValidator')

const loginValidator = require('../validator/auth/loginValidator')

const profileValidator = require('../validator/Profile/profile')

const {signupController,loginController,profileController} = require('../controllers/authController')

// const authenticate = require('../validator/authentication/authenticate')

const {authen} = require('../validator/authentication/authen')


router.post('/signup',signupValidator,signupController)

router.post('/login',loginValidator,loginController)

router.post('/create-profile',authen,profileValidator,profileController)

module.exports = router
