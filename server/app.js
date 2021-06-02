require("dotenv").config( {encoding: 'latin1'});
const express = require("express")
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const setMiddleware = require("./middlewares")
const setRoute = require("./routes")

const app = express()

setMiddleware(app)

setRoute(app)

// app.use(router)












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
        logger.info('Database Connected')
    })
     .catch((e)=>{
         console.log(e) 
         logger.error(e.message)
     })


 mongoose.set('useFindAndModify', false);

 
 app.listen(PORT,()=>{
    console.log('Server is running on PORT ' + PORT)
});