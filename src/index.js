import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store/index.js"


// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./reducers/userReducer";

// // const store = createStore( rootReducer, {} ); 
// const store = configureStore ( {
//   reducer:{
//     user: userReducer,
//   }
// })

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log( "/index.js" + store);

root.render(
  <React.StrictMode>
    
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>
);

