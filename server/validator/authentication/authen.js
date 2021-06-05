const  jwt = require('jsonwebtoken')

exports.authen = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]

        let decodedData 

        if(token){
            decodedData = jwt.verify(token,'SECRET')
            req.userId = decodedData?._id;
        }
 
        next()
    }catch(error){
       console.log(error)
    }
}
