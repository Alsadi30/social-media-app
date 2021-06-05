const router = require('express').Router()

const authRoute = require('./authRoute')








const route =  router.get('/',(req,res,next)=>{
     res.json({msg:'success'})
     console.log('i am basic')
})




const routes = [
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/',
        handler:route
    }
   
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

