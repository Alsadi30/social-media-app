import React from 'react';
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
     <Switch>
       <Route path='/signup' exact component={SignUp}/> 
       <Route path='/login' exact component={Login}/> 
       <Route path='/create-profile' exact component={Profile}/>
     </Switch> 
    </div>
    </BrowserRouter>
    
  );
}

export default App;
