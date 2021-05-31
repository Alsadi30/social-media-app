const {Schema,model} = require('mongoose')

const likeSchema = new Schema({
  post:{
      type:Schema.Types.ObjectId,
      ref:'Post',
      required:true
  },
  user:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
  },
  count:{
      type:Number,
      default:0
  }
})

const Like = model('Like',likeSchema)


module.exports = Like