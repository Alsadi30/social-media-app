import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function PrivateRoute({ component, ...rest }) {
    
    const {isAuthenticated,isLoading} = useSelector(state=>state.authReducer)

       if (!isAuthenticated && !isLoading) {
           return <Redirect to='/login'/>
    }
    
    return <Route {...rest} component={component}/>
    
}
