
const {body} = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('email')
        .notEmpty()
        .withMessage("Email Can Not be Empty")
        .isEmail()
        .withMessage('Please Provide A Valid Email'),
     body('password')
        .notEmpty()
        .withMessage("password Can Not be Empty")
        .isLength({
            min:6
        })
        .withMessage('Password Must Be Contain Minimum 6 Chars')     

     
]


