import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from './store';
import {Provider} from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import jwtDecode from 'jwt-decode'
import Types from './store/actions/type'


const token = localStorage.getItem('auth_token')

if(token){
  let decode = jwtDecode(token)
  setAuthToken(token)
  store.dispatch({
    type:Types.SET_USER,
    payload:{
      user:decode
    }
  })
}





ReactDOM.render(

  <Provider store={store}>
  <React.StrictMode>
   <App />
   </React.StrictMode>
 </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
