const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')
const User = require('../models/User')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')
const Profile = require('../models/Profile')
const Post = require('../models/Post')



//Sign Up route
//api:/auth/signup


exports.signupController = async (req, res, next) => {
    let {
        name,
        email,
        password,
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



//Login Contoller
//api:/auth/login


exports.loginController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body
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
                email: user.email,
                profilePics:user.profilePics,
                name: user.name,
                profile
            }, 'SECRET', {
                expiresIn: '5h'
            })

            res.status(200).json({
                message: 'Successfully Login',
                token: `Bearer ${token}`,
            })


        } else {
            res.status(404).json({
                error: 'User Not Found'
            })
        }

    } catch {
          res.status(505).json({error:'Server error occured in login'})
    }
}




//getting all user
//api:/auth/users



exports.getUsersController = async (req, res, next) => {
    let userId = req.userId
    
    if (!userId) {
        res.status(404).json('You are not an valid user')        
    } else {
        try {
            let users = await User.find()
            res.status(201).json(users)
        }
        catch (e) {
        res.status(505).json('Server Error Occuredd')
        }
    }
  
}



//Profile Pic upload controller
//api:/auth/profilePics


exports.uploadProfileController = async (req, res, next) =>{
    let profilePics = req.file?.filename

    const id = req.userId

    try{
       const user =  await User.findOneAndUpdate({
            _id:id   },{$set:{
                profilePics
       }
       })
        
       let profile =  user.profile?true:false
        
       let token = jwt.sign({
        _id: user.id,
        email: user.email,
        profilePics:profilePics,
        name: user.name,
        profile
    }, 'SECRET', {
        expiresIn: '5h'
    })
    
        res.status(201).json({msg:'Profile pic uploaded',user, token: `Bearer ${token}`})
    }
    catch(error){
        res.status(500).json({error:'server error occured in profilePics'})
    }

   

}





// TODO:We Should Update Front User At ProfileController

//Profile Create Controller
//api:/auth/create-profile

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
         res.status(505).json({ error:'Server Error Occured'})
       
  }
}

//Get Profile by Id
//api:/auth//get-profile/:id

exports.getProfileController = async (req, res, next) => {
    let { id } = req.params
    
    try {
        let profile = await Profile.findOne({ user: id })
            .populate({
                path: 'post',
                populate: {
                    path: 'author',
                    select:'profilePics name'
                }}
            
        )
            
    
        res.status(201).json(profile)    
    }
    catch(error){
        res.status(500).json('SERVER Error Occured')
    }

    

}

  
//Update profile by id
//api:/auth/update-profile/id


exports.updateProfileController = async (req, res, next) => {
 
    let {id} = req.params

    let profile = await Profile.findById({ _id: id })
        

    if(!profile) res.status(404).json('Profile Not Found')

    let {
    name,
    bio,
    link,
    institute,
    birthDate,
    gender,
    language
      } = req.body
    
    if (name) profile.name = name
    if (bio) profile.bio = bio
    if (link) profile.link = link
    if (institute) profile.institute = institute
    if (birthDate) profile.birthDate = birthDate
    if (gender) profile.gender = gender
    if(language) profile.language = language
    

    try {
        if (profile.user.toString() === req.userId) {
         
            let updatedProfile = await Profile.findOneAndUpdate({ _id: id },  { $set: profile},{ new: true })
            
            res.status(201).json({updatedProfile})
        } else {
            res.status(404).json({msg:'You are not a valid user'})
        }
    } catch (e) {
        res.status(500).json({e})
     }


}


//delete Profile,User,Post comment every thing related to profile by id
//api:/auth/delete-profile/id
exports.deleteProfileController = async (req, res, next) => {

    let {id} = req.params


    let profile = await Profile.findById({_id:id})

    try {
        if (profile.user.toString() === req.userId) {
      
            await Profile.findOneAndDelete({ _id: id })
            
            await User.findOneAndDelete({ _id: req.userId })
             
            await Comment.findOneAndDelete({ user:req.userId })
            
            await Post.findOneAndDelete({author:req.userId})
            
            res.status(201).json({msg:'ok'})
        } else {
            res.status(404).json({msg:'You are not a valid user'})
        }
    } catch (error) {
        res.status(500).json({msg:error})
     }
    
}