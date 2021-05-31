const express = require('express')
const useMorgan = require('./useMorgan')
const cors = require('cors')


const middleware = [
    express.static('public'),
    express.urlencoded({extended:true}), 
    express.json(),
    cors(),

]



module.exports = app =>{
    useMorgan(app)
    middleware.forEach(m=>{
        app.use(m)
    })
}