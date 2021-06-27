 import Types from '../actions/type'


const initialProfile = {
    profile:{},
    error: {},
    users:[]
}

const profileReducer = (state=initialProfile,action)=>{
    switch (action.type){
        case Types.SET_PROFILE:{
            console.log(action.payload.profile)
            return {
                ...state,
                profile:action.payload.profile,
                error:{}
            } 
            
        }
        case Types.GET_PROFILE:{
            console.log(action.payload)
            return {
                ...state,
                profile:action.payload,
                error:{}
            } 
            
        }
        case Types.UPDATE_PROFILE: {
            return {
                ...state,
                profile:action.payload
            }
        }
        case Types.DELETE_PROFILE: {
            return {
                state:initialProfile
            }
        }    
        case Types.GET_USERS: {
            return {
                ...state,
                users: action.payload
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