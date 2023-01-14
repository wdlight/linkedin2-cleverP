import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { auth, provider } from "../firebase";

console.log( "userSlice : Start>>>" );


// URL 호출 async 동작 방법
// 선언 이후에 extrareducer에서 처리함.
// const url = "/testapi";
// export const getUserInfo = createAsyncThunk('user/getUserInfo', () => {
// 	return fetch(url)                                            // return은 Promise 객체이다?
// 		.then ( (resp) => resp.json() )
// 		.catch( (err) => console.log( err ) )
// });

export const userSlice = createSlice ( {
  name:"user_slice",
  //initialState,
  initialState : {
    userInfo: null,  
  },  
  reducers : {    
    login(state, action){      

      // 하단의 action.paryload로 썼을 때에는 exception caught이 일어나지만 진행이 된다.
      // 없애기 위해서는 해당 값을 JASON.stringify() , JASON.parse()를 통해서 하면
      // 에러는 없어지긴 한다.
      //state.userInfo = JSON.parse( action.payload );
      //state.userInfo.push( action.payload );
      state.userInfo = action.payload;
      console.log( "userReducer: user login() with action:[" + action.payload + "]");
      //return {...state, userInfo: action.payload};
      
    },
    logout(state){      
      state.userInfo = null;      
      console.log( "userReduceruser logout()" );
    },
    setUser(state, action) {
      state.userInfo = action.payload;
      console.log( "userReducer: setUser () with action:[" + action.payload + "]");
    }
  },  
});
//selectors
export const selectUser = (store) => store.user_slice.userInfo;
export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer; // reducer 단수이다..
