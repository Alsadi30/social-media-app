import {combineReducers} from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'

const rootReducer = combineReducers({ 
   authReducer,profileReducer,postReducer

})

export default rootReducer