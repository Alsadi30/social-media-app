import React from 'react';
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
     <Switch>
       <Route path='/signup' exact component={SignUp}/> 
       <Route path='/login' component={Login}/> 
     </Switch> 
      <SignUp/>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
