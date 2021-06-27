const router = require('express').Router()

const signupValidator = require('../validator/auth/signupValidator')

const loginValidator = require('../validator/auth/loginValidator')

const profileValidator = require('../validator/Profile/profile')

const {signupController,loginController,getUsersController, profileController,uploadProfileController ,updateProfileController,deleteProfileController,getProfileController} = require('../controllers/authController')

// const authenticate = require('../validator/authentication/authenticate')

const {authen} = require('../validator/authentication/authen')
const upload= require('../middlewares/uploadMiddleware')



router.post('/signup',signupValidator,signupController)

router.post('/login', loginValidator, loginController)

router.get('/users',authen,getUsersController)

router.post('/profilePics',authen,upload.single("profilePics"),uploadProfileController)

router.post('/create-profile',profileValidator,authen,profileController)

router.get('/get-profile/:id',authen,getProfileController)

router.post('/update-profile/:id',authen,updateProfileController)

router.delete('/delete-profile/:id',authen,deleteProfileController)





module.exports = router
