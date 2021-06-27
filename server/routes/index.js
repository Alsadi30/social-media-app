const router = require('express').Router()

const authRoute = require('./authRoute')
const postRoute = require('./postRoute')



const routes = [
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/post',
        handler:postRoute
    },
   
   
]

module.exports = (app)=>{
   routes.forEach(r=>{
       if(r.path==='/'){
        app.get(r.path,r.handler)
       }else{
        app.use(r.path,r.handler)
       }
   
   })
    
}

