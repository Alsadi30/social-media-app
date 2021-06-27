import React from 'react';
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import CreateProfile from './components/profile/createProfile';
import Feed from './components/Feed'
import Profile from './components/profile/Profile'
import PrivateRoute from './Route/PrivateRoute'




function App(){

  
 

  return (
    <BrowserRouter>
    <div className='App'>
     <Switch>
       <Route path='/signup' exact component={SignUp}/> 
       <Route path='/login' exact component={Login}/> 
       <PrivateRoute path='/create-profile' exact component={CreateProfile} />
       <PrivateRoute path='/' exact component={Feed} />
       <PrivateRoute path='/profile' exact component={Profile} />
     </Switch> 
    </div>
    </BrowserRouter>
    
  );
}

export default App;
