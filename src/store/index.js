// import { createStore, applyMiddleware}  from "redux";
import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "../reducers/articleReducer";
import userReducer from "../reducers/userReducer";
// import thunkMiddleware from "redux-thunk";

console.log ( "store/index.js")

const store = configureStore ( {
  reducer:{
    user_slice: userReducer,
    article_slice: articleReducer,
  },
  
})

export default store;