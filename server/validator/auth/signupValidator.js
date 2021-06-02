const {body} = require('express-validator')
const User = require('../../models/User')


module.exports = [

 body('name')
     .isLength({
         min:2,
         max:18
     })
     .withMessage('Name Must Be Between 2 to 18 Chars')
     .trim()
     .custom(async name=>{
         let user = await User.findOne({
             name
         })
        if(user){
            return Promise.reject('This Name Already Used')
        } 
     }),

  body('email')
     .isEmail()
     .withMessage('Please Provide A Valid Email')
     .custom(async email => {
        let user = await User.findOne({
            email
        })
        if (user) {
            return Promise.reject('This Email Already Used')
        }
        return true
    })
     .normalizeEmail(),

   body('password')
     .isLength({
         min:6
     }).withMessage('Your Password Must Be Greater Then 6 Chars'),

   body('confirmPassword')
     .notEmpty()
     .withMessage('Confirm Password Cannot Be Empty')
     .custom((confirmPassword,{req})=>{
         if(confirmPassword!==req.body.password){
             throw new Error ('Password Does Not Match')
         }
         return true
     })  

     
]


