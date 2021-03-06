const {Schema,model} = require('mongoose')

const postSchema = new Schema({
   
    body:{
        type:String,
        maximum:500
    },
    tags:[],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    thumbnail:String,
    like:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comment:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    share:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
},{timestamps:true})

const Post = model('Post',postSchema)


module.exports =  Post