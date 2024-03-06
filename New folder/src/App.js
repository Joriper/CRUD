import React from 'react';
import './App.css';
import {Route,BrowserRouter,Redirect} from 'react-router-dom';
import Login from './container/login/login.js';
import Register from './container/register/register.js';
import { Routes } from 'react-router-dom';
import Admin from './container/admin/admin.js';
import rootreducer from './reducers/root.js';
import Verify from './container/verify/verify.js';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import dotenv from 'react-dotenv'
const store = createStore(rootreducer,applyMiddleware(thunk))
function App() {
 return(
  <Provider store={store}>
  <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/verify" element={<Verify />}/>
        <Route exact path="/admin" element={<Admin />}/>
      </Routes>

    </BrowserRouter>
  </Provider>
  
  );
}

export default App;
