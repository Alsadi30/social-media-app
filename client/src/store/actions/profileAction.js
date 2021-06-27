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

export const getProfile = (id) => (dispatch) => {
    
    axios.get(`http://localhost:8080/auth/get-profile/${id}`)
        .then(res => {
            console.log(res)
            dispatch({
                type: Types.GET_PROFILE,
                payload:res.data
          })
        })
        .catch(e => {
            console.log(e)
        })

}


export const updateProfile = (id, forme, history) => (dispatch) => {
    axios.post(`http://localhost:8080/auth/update-profile/${id}`, forme)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: Types.UPDATE_PROFILE,
                payload:res.data.updatedProfile
                })
        })
        .catch(e => {
            console.log(e)
        })
    history.push('/profile')
}

export const deleteProfile = (id) => (dispatch) => {
    console.log('clled'+id)
    axios.delete(`http://localhost:8080/auth/delete-profile/${id}`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user:{}
                }
            
            })
          
        })
        .catch(e => {console.log(e)})
}


export const getUsers = () => (dispatch) => {
    axios.get('http://localhost:8080/auth/users')
        .then(res => {
            dispatch({
                type: Types.GET_USERS,
                payload:res.data
            })
           
        })
        .catch(e => {
            console.log(e)
        })
}