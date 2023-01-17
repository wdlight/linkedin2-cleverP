// Firebase와의 연계에 필요한 API set들을 정의해 놓은 곳
// 1. signIn
// 2. signOut
// 3. AuthChange ..


// 중간 단계.. 이것 API 시리즈는 모아는 놓아서 refactoring을 해야 하지만..
// 잘 안되어서.. 당장은 보류..

import { login, logout, setUser } from "../reducers/userReducer";
import { auth, db, provider } from "../firebase";


// firebase Google Login 
export function signInAPI() {
  
  return (dispatch) => {
    auth  
      .signInWithPopup(provider)      
      .then (( payload ) => {
        console.log("signInAPI called:" + payload);
        dispatch( login( payload.user))
      })
      .catch( (error) => alert( error.message));
  }
}

// 2. firebase Google logOut
export function signOutAPI() {  
  return (dispatch) => {
    auth  
      .signOut()      
      .then ( () => {
        console.log("signOutAPI called." );
        dispatch( logout() )
      })
      .catch( (error) => alert( error.message));
  }
}

// 3. firebase Google Auth change!
export function getUserAPI () {
  return ( dispatch) =>{
    auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        // user is loggined in
        dispatch( setUser( userAuth) );    
        console.log("useEffect: user-log in")  
      } else {
        //user is logged out        
        dispatch( logout());      
        console.log("useEffect: user-log out")
      }
      
    });
  } 
}

// 4. getArticlesAPI
export function getArticlesAPI () {
  return ( dispatch) => {
    let payload;

    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot( (snapshot) => {
        payload = snapshot.docs.map( (doc) => doc.data() );
        console.log(payload);
      });
  }
}