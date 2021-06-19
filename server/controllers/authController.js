const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Profile = require('../models/Profile')


exports.signupController = async (req, res, next) => {
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

            let profile =  user.profile?true:false

            let token = jwt.sign({
                _id: user.id,
                profilePics:user.profilePics,
                email: user.email,
                name: user.name,
                profile
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



exports.uploadProfileController = async (req, res, next) =>{
    let profilePics = req.file?.filename

    const id = req.userId

    try{
       const user =  await User.findOneAndUpdate({
            _id:id   },{$set:{
                profilePics
            }})
        console.log(profilePics)
        console.log(req.userId)
    
        res.status(201).json({msg:'Profile pic uploaded',user})
    }
    catch(error){
        res.status(500).json({error:'server error occured in profilePics'})
    }

   

}





// TODO:We Should Update Front User At ProfileController


exports.profileController = async (req,res,next) =>{
  
    let errors = validationResult(req).formatWith((error) => error.msg)
  
    if(!errors.isEmpty()){
        return res.status(404).json({
            error: errors.mapped()
        })
    }
     
         
  
  try{
    
    let {name,bio,link,institute,birthDate,gender,language}  = req.body
   
    
    
    

    let profile = new Profile({
        user:req.userId,
        name,
        bio,
        link:link||'',
        institute:institute||'',
        birthDate:birthDate||'',
        gender,
        language:language||'',
        post:[],
        poll:[],
        bookmark:[]
    })

    
    let createdProfile = await profile.save()

    

    await User.findOneAndUpdate({
        _id:req.userId
    },{$set:{
        profile:createdProfile._id,
    }})

    res.status(201).json({
        msg:createdProfile
    })

  } catch(error){
         console.log(error)
         res.status(505).json({ error:'Server Error Occured'})
       
  }
}

exports.updateProfileController = async (req, res, next) => {

    console.log('a first')

    
    let {id} = req.params

  

    let profile = await Profile.findById({_id:id})
   
    let {
       
        institute,
       
        language
      } = req.body
    
   
    

    try {
        if (profile.user.toString() === req.userId) {
         
            console.log('a second')

            let profile = await Profile.findOneAndUpdate({ _id: id },  { $set: { institute,language,}},{ new: true })
            
            res.status(201).json({profile})
        } else {
            res.status(404).json({msg:'You are not a valid user'})
        }
    } catch (e) {
        res.status(500).json({e})
     }


}

exports.deleteProfileController = async (req, res, next) => {

    let {id} = req.params

 

    let profile = await Profile.findById({_id:id})

    try {
        if (profile.user.toString() === req.userId) {
      
            await Profile.findOneAndDelete({_id:id})
            
            res.status(201).json({msg:'ok'})
        } else {
            res.status(404).json({msg:'You are not a valid user'})
        }
    } catch (e) {
        res.status(500).json({e})
     }
    
   

}