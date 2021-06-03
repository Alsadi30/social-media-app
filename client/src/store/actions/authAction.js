import axios from 'axios'
import Types from './type'
import setAuthToken from '../../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

export const signUp = (user,history) => (dispatch) =>{
    axios.post('/auth/signup',user)
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
    axios.post('/auth/login',user)
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
           history.push('/')
       })
       .catch(e =>{
           dispatch({
               type:Types.USER_ERROR,
               payload:{
                   error:e.response.data.error
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