const router = require('express').Router()

const signupValidator = require('../validator/auth/signupValidator')

const loginValidator = require('../validator/auth/loginValidator')

const profileValidator = require('../validator/Profile/profile')

const {signupController,loginController,profileController,uploadProfileController ,updateProfileController,deleteProfileController} = require('../controllers/authController')

// const authenticate = require('../validator/authentication/authenticate')

const {authen} = require('../validator/authentication/authen')
const upload= require('../middlewares/uploadMiddleware')


const fid = () => {
    console.log('OK')
}


router.post('/signup',signupValidator,signupController)

router.post('/login',loginValidator,loginController)

router.post('/profilePics',authen,upload.single("profilePics"),uploadProfileController)

router.post('/create-profile',profileValidator,authen,profileController)

router.post('/update-profile/:id',authen,fid,updateProfileController)

router.delete('/delete-profile/:id',authen,deleteProfileController)





module.exports = router
