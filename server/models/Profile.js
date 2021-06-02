const {Schema,model} = require('mongoose')

const profileSchema = new Schema({

    // user:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },
    bio:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },
    link:[],
    post:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    poll:[
        {
            type:Schema.Types.ObjectId,
            ref:'Poll'
        }
    ],
    bookmark:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    profilePics:String,
    institute:String,
    birthDate:{
        type:String,
        // required:true
    },
    gender:{
        type:String,
        required:true,
    },
    language:String

},{timestamp: true})

const Profile = model('Profile',profileSchema)

module.exports = Profile