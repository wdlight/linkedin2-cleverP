import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],  
};

// const userReducer = ( state = INITIAL_STATE, action ) => {
//   switch ( action.type ) {
//     default:
//       return state;
//   }
// };
console.log( "userSlice : >>>");

export const userSlice = createSlice ( {
  name:"user",
  initialState,
  reducers : {
    // like, comments, share, send button에 대한 action처리 진행.
    getUser( state, action ){
      console.log( "getUser -- redux - slice." + action.payload);
      state.user = action.payload;
    },
    likeCount( state , action ){
      console.log ( "like_count -- reducer");
    },
  }
});

console.log( "userSlice : " , userSlice);

export const { getUser, likeCount } = userSlice.actions;
export default userSlice.reducer; // reducer 단수이다..
