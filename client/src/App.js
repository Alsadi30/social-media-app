import React from 'react';
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import CreateProfile from './components/profile/createProfile';
import Feed from './components/Feed'
import Profile from './components/profile/Profile'
import PrivateRoute from './Route/PrivateRoute'
import jwtDecode from 'jwt-decode'



function App(){

  const token = localStorage.getItem('auth_token')
 const user = jwtDecode(token)

  return (
    <BrowserRouter>
    <div className='App'>
     <Switch>
       <Route path='/signup' exact component={()=>(!user?<SignUp/>:<Redirect to='/'/>)}/> 
       <Route path='/login' exact component={()=>(!user?<Login/>:<Redirect to='/'/>)}/> 
       <PrivateRoute path='/create-profile' exact component={CreateProfile} />
       <PrivateRoute path='/' exact component={Feed} />
       <PrivateRoute path='/profile' exact component={Profile} />
     </Switch> 
    </div>
    </BrowserRouter>
    
  );
}

export default App;
