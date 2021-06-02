const router = require('express').Router()

const signupValidator = require('../validator/auth/signupValidator')

const loginValidator = require('../validator/auth/loginValidator')

const profileValidator = require('../validator/Profile/profile')

const {signupController,loginController,profileController} = require('../controllers/authController')

const authenticate = require('../validator/authentication/authenticate')



router.post('/signup',signupValidator,signupController)

router.post('/login',loginValidator,loginController)

router.post('/create-profile',profileValidator,profileController)

module.exports = router
