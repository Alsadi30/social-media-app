import axios from 'axios'
import Types from './type'
import setAuthToken from '../../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

export const signUp = (user,history) => (dispatch) =>{
    axios.post('http://localhost:8080/auth/signup',user)
      .then(res=>{
          dispatch({
              type:Types.USER_ERROR,
              payload:{
                  error:{}
              }
          })
          history.push('/login')
      }).catch(e=>{
         dispatch({ 
             type:Types.USER_ERROR,
             payload:{
                 error:e.response.data
                }
         })
      })
}


export const login = (user,history) => (dispatch)=>{
    axios.post('http://localhost:8080/auth/login',user)
       .then(res => {
           let token = res.data.token
           localStorage.setItem('auth_token',token)
           setAuthToken(token)
            const decode = jwtDecode(token)
           dispatch({ 
               type:Types.SET_USER,
               payload:{
                  user:decode
               }
           })

           if (decode.profile) {
               history.push('/')
           } else {
            history.push('/create-profile')  
           } 
       })
       .catch(e =>{
           dispatch({
               type:Types.USER_ERROR,
               payload:{
                   error:e.response.data
               }
           })
       })
}



export const logout = (history) => dispatch =>{
    localStorage.removeItem('auth_token')
    history.push('/login')

    return {
    
       type:Types.SET_USER,
       payload:{
           user:{}
       }

    }
 }