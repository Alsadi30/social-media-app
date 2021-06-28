import Types from '../actions/type'

const init = {posts:[], post:{},thumbnail:'',body:'',tags:'',isLoading:true}

const postReducer = (state=init,action) =>{
    switch (action.type) {
        case Types.SET_THUMBNAIL: {
            return {
                 ...state,
                thumbnail: action.payload,
                isLoading:false
            }
        
        }
        case Types.SET_POST: {
            
            return {
                ...state,
                posts: [action.payload,...state.posts],
                isLoading:false
                
            }
        }
        case Types.POST_ERROR:{
            return {
                ...state,
                error: action.payload.error,
                isLoading:false
            }
        }
        case Types.GET_POSTS:{
            return {
              ...state,   
                posts: action.payload.post,
                isLoading:false
             } 
        }
        case Types.GET_POST: {
            return {
                ...state,
                post: action.payload,
                isLoading:false
            }
        }    
        case Types.GET_USER:{
            return {
                user: action.payload,
               
            }
        }
        case Types.EDIT_POST: {
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
            }
            
        }    
        case Types.DELETE_POST: {
            console.log('iam caleed', state)
            console.log(action.payload.id)
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                isLoading:false
            }
        }
               
        default:return state
    }

}

export default postReducer