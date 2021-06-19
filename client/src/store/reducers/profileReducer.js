 import Types from '../actions/type'


const initialProfile = {
    profile:{},
    error:{}
}

const profileReducer = (state=initialProfile,action)=>{
    switch (action.type){
        case Types.SET_PROFILE:{
            console.log(action.payload.profile)
            return {
                profile:action.payload.profile,
                error:{}
            } 
            
        }
        case Types.PROFILE_ERROR:{
          console.log(action.payload.error)
          
            return {
                ...state,error:action.payload.error     
            }
        }
        default:return state
    }
}

export default profileReducer