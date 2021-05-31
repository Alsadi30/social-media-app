const {Schema,model} = require('mongoose')

const subscribeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    subscribed:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    count:{
        type:Number,
        default:0
    }

})

const Subscribe = model('Subscribe',subscribeSchema)


module.exports = Subscribe 