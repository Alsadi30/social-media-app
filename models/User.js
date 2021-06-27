const {Schema,model} = require('mongoose')

const userSchema = new Schema({

    name:{
        type:String,
        trim:true,
        maxlength:25,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    profilePics:{
        type:String,
        default:'/default.png'
    },},
    {timestamps:true})

const User = model('User',userSchema)


module.exports = User