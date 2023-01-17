import { createSlice} from "@reduxjs/toolkit";

console.log( "articleSlice : Start>>>" );

export const articleSlice = createSlice ( {
  name:"article_slice",  
  initialState : {
    articles:[],
    loading: false,
  },  
  reducers : {    
    setLoading ( state, action){      
      state.loading = action.payload;
    },
    getArticles ( state, action) {
      console.log ( "store.articleSlice.getArticles" +state.articles)
      return state.articles;
    },
    setArticles ( state, action ){
      console.log ( "store.articleSlice.setArticles" + action.payload)
      state.articles = action.payload;
    }
    
  },  
});
//selectors
export const selectloading = (store) => store.article_slice.loading;
export const { setLoading, setArticles } = articleSlice.actions;

export const selectArticles = (store) => store.article_slice.articles;



export default articleSlice.reducer; // reducer 단수이다..
