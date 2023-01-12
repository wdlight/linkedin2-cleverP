// import { createStore, applyMiddleware}  from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";



console.log ( "store/index.js")
// const store = createStore( rootReducer, {} ); 
const store = configureStore ( {
  reducer:{
    user: userReducer,
  }
})



export default store;