
import Types from './type'
import axios from 'axios'

export const createProfile = (profile,history) => (dispatch) =>{
    axios.post('http://localhost:8080/auth/create-profile',profile)
     .then(res=>{
         console.log(res.data.msg)
         dispatch({
             type:Types.SET_PROFILE,
             payload:{
                 profile:res.data.msg
                  }   
          })
          history.push('/')
     })
     .catch(error=>{
        //  console.log(error.response.data)
         dispatch({
             type:Types.PROFILE_ERROR,
             payload:error.response.data
         })
     })
}