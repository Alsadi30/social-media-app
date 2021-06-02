const {body} = require('express-validator')
const validator = require("validator");

const dateValidator = (value) =>{
    if(value){
        if(!validator.isDate(value)){
            throw new Error('Please Provide Valid Date')
        }
    }
}


const linkValidator = (value) => {
    if (value) {
        value.map(v=>{
            if (!validator.isURL(v)) {
                throw new Error("Please Provide Valid URL");
              }
        })
     
    }
    return true;
};



module.exports = [
    body('name')
      .isLength({
          min:2,
          max:18
      })
      .withMessage('Name Must Be Between 2 to 18 Chars'),
    body('bio')
      .isLength({
          min:10,
          max:200
      })  
      .withMessage('Bio Must Be Contain 10 Chars'),
  
        
    // body('birthDate')
    // .notEmpty()
    //  .withMessage('Date of Birth Can Not Be Empty')
    //  .custom(dateValidator),
   
     body('link')
      .custom(linkValidator),
      
     body('gender')
      .notEmpty()
      .withMessage('Gended Can Not Be Empty') 


]
