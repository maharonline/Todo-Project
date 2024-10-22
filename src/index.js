import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './config/global'
import reportWebVitals from './reportWebVitals';
import AuthContext from './context/AuthContext'; 
import ProfileContext from './context/ProfileContext';
// import ProfileContext from './context/ProfileContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <ProfileContext>


    <BrowserRouter>
    <App />
    </BrowserRouter>
      </ProfileContext>
    </AuthContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
