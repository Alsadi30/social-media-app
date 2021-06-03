const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Profile = require('../models/Profile')
const authenticate = require('../validator/authentication/authenticate')

exports.signupController = async (req, res, next) => {
    console.log('i am called')
    let {
        name,
        email,
        password,
        confirmPassword
    } = req.body

    let errors = validationResult(req).formatWith((error) => error.msg)
    console.log(errors.mapped())
    if (!errors.isEmpty()) {
        res.status(404).json({
            error: errors.mapped()
        })
    } else {
        try {

            let hashedPassword = await bcrypt.hash(password, 12)

            let user = new User({
                name,
                email,
                password: hashedPassword
            })

            let result = await user.save()

            res.status(201).json({
                result
            })

        } catch {
            res.status(505).json({
                error: 'Server error occured'
            })
        }

    }



}


exports.loginController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body
    console.log('called')
    let errors = validationResult(req).formatWith((error) => error.msg)

    console.log(errors.mapped())

    if (!errors.isEmpty()) {
        return res.status(404).json({
            error: errors.mapped()
        })
    }
    try {
        let user = await User.findOne({
            email
        })

        if (user) {

            let match = await bcrypt.compare(password, user.password)

            if (!match) {
                return res.status(404).json({
                    error: 'Please Provide Valid Credential'
                })
            }

            let token = jwt.sign({
                _id: user.id,
                email: user.email,
                name: user.name
            }, 'SECRET', {
                expiresIn: '5h'
            })

            res.status(200).json({
                message: 'Successfully Login',
                token: `Bearer ${token}`
            })


        } else {
            res.status(404).json({
                error: 'User Not Found'
            })
        }

    } catch {
          console.log()
          res.status(505).json({error:'Server error occured in login'})
    }
}




exports.profileController = async (req,res,next) =>{
  
    let errors = validationResult(req).formatWith((error) => error.msg)
  
    if(!errors.isEmpty()){
        return res.status(404).json({
            error: errors.mapped()
        })
    }
     
         
  
  try{
    
    let {name,bio,link,institute,birthDate,gender,language,profilePics}  = req.body
   
    let profilePic = profilePics ? profilePics:'' 


    let profile = new Profile({
        // user:req.user._id,
        name,
        bio,
        link:link||[],
        institute:institute||'',
        birthDate:birthDate||'',
        gender,
        language:language||'',
        profilePics:profilePic||'',
        post:[],
        poll:[],
        bookmark:[]
    })

    
    let createdProfile = await profile.save()

    

    // await User.findOneAndUpdate({
    //     _id:req.user._id
    // },{$set:{
    //     profile:createdProfile._id,
    //     profilePics:profilePics
    // }})

    res.status(201).json({
        msg:createdProfile
    })

  } catch{
         res.status(505).json({ error:'Server Error Occured'})
         next()
  }
}