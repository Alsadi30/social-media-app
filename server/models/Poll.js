const {Schema,model} = require('mongoose')

const pollSchema = new Schema({

    title:{
        type:String,
        required:true,
        trim:true,
        maximum:100
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    option:[
        {
            value:{
                type:String,
                required:true,
                maximum:40
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ]

},{timestamp: true})

const Poll= model('Poll',pollSchema)


module.exports = Poll