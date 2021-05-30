require("dotenv").config( {encoding: 'latin1'});
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use((req,res,next)=>{
    let error = new Error("404 Page not found")
    error.status = 404;
    next(error)
})

app.use((error,req,res,next) =>{
    if(error.status===404){
        return res.status(404).json({
            msg:'Page not found',
            status:404
        })
    }
    res.status(505).json({
        msg:'Internal Server Error',
        status:505
    })
})


const PORT = process.env.PORT || 8080
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
  
   
})
     .then(()=>{
         app.listen(PORT,()=>{
         console.log('Server is running on PORT ' + PORT)
     });
    })
     .catch((e)=>{
         console.log(e) 
     })


 mongoose.set('useFindAndModify', false);