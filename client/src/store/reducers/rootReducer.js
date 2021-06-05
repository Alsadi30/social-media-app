import {combineReducers} from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({ 
   authReducer,profileReducer

})

export default rootReducer