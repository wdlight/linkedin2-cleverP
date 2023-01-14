// import { createStore, applyMiddleware}  from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
// import thunkMiddleware from "redux-thunk";

console.log ( "store/index.js")

const store = configureStore ( {
  reducer:{
    user_slice: userReducer,
  },
  
})

export default store;