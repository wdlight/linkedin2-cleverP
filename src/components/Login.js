import styled from 'styled-components';
import React, { useEffect,useState } from 'react';
// import { signInAPI } from '../actions/index'
import { auth, provider, signInWithPopup } from '../firebase.js';
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setUser, selectUser } from "../reducers/userReducer";
import { Navigate } from "react-router-dom";

import { signInAPI, signOutAPI, getUserAPI } from "../actions/fbauth.js"

const Login = (props) => {
// Login 처리 
// user 가 있으면 설정하고, /Home 으로 redirect한다.
  //const user = useSelector( selectUser );
  // const dispatch = useDispatch();
  // console.log ( "Login.js >> user is :" + user );

  // useEffect ( () => {
  //   auth.onAuthStateChanged( (userAuth) => {
  //     if (userAuth) {
  //       // user is loggined in
  //       dispatch( login ( {
  //         email : userAuth.email,
  //         uid: userAuth.uid,
  //         displayName: userAuth.displayName,
  //         photoUrl: userAuth.photoURL,
  //       }));
        
  //     } else {
  //       //user is logged out        
  //       dispatch( logout());
  //       console.log("useEffect: user-log out")
  //     }
  //   });
  // }, null);
  // function getUserAPI () {
  //   return () =>{
  //     auth.onAuthStateChanged( async (userAuth) => {
  //       if (userAuth) {
  //         // user is loggined in
  //         dispatch( setUser( userAuth) );    
  //         console.log("useEffect: user-log in")  
  //       } else {
  //         //user is logged out        
  //         dispatch( logout());      
  //         console.log("useEffect: user-log out")
  //       }
        
  //     });
  //   } 
  // }
  // useEffect ( () =>{
  //   getUserAPI();
  // }, [])

  const user = useSelector( selectUser );

  const [ logon , setLogon] = useState(false); 
  useEffect(() => {
    auth.onAuthStateChanged((user) => {       
      setLogon( !logon );      
      console.log ( "useEffect>>" + user )
    });
  }, [user] )

  // SignIn Button click handler function
  // const handleAuth = (e) => fb_signIn();    
  // const fb_signIn = () => {
  //   auth.signInWithPopup(provider)
  //   .then( (result) => {
  //     // user sign in 이 완료된 상황.
  //     // set user를 해야 한다.
  //     console.log("calling login" + result );
  //     dispatch( login( result.user) );
  //   })
  //   .catch( (error) => {alert(error.message );});
  // }
  
  const dispatch = useDispatch();
  function signInAPI() {
    
      console.log ( "signIn API32" + auth) ;
      auth  
        .signInWithPopup(provider)      
        .then (( payload ) => {
          console.log("signInAPI called:" );
          console.log( payload.user);
          dispatch( login( payload.user))
          //dispatch( login( JSON.stringify (payload.user)))
          setLogon(true);
        })
        .catch( (error) => alert( error.message));
    
  }
  

  function handleAuth() {
    console.log( "Login.js >> handleAuth() ")
    // auth  
    //   .signInWithPopup(provider)      
    //   .then (( payload ) => {
    //     console.log("signInAPI called:" + payload);
    //     dispatch( login( payload.user))
    //   })
    //   .catch( (error) => alert( error.message));

    signInAPI();  
  }

  return (
      <Container>
        { user && <Navigate to ="/home" /> }
        <Nav>
          <a href="/">
            <img src="/images/login-logo.svg" alt="" />
          </a>          
          <div>
            <Join>Join now</Join>
            <SignIn>Sign in</SignIn>
          </div>
        </Nav>
        <Section>
          <Hero>
            <h1>Welcome to your professional community</h1>       
            <img src="/images/linkin2-bg.png" alt="" />

          </Hero>
          <Form>
            {/* <Google onClick={()=>props.signIn()}> */}
            <Google onClick={ handleAuth }>
            
              <img src="/images/google.svg" alt="" />Sign in with Google
            </Google>
          </Form>
        </Section>
      </Container>  
  )
}

const Container = styled.div`
  padding: 0px;  
`;
const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px, 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px; 
    height: 34px;
    @media(max-width: 768px){
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba ( 0,0,0, 0.6 );
  margin-right: 12px;

  border-radius: 12px;
  &:hover {
    background-color: rgba( 0,0,0, 0.08);
    color: rgba( 0,0,0,0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba( 0,0,0,0);
  &:hover {
    background-color: rgba( 112,181,249,0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media ( max-width: 768px ) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width : 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 48px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media ( max-width: 768px ) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }

  }
  img {
    /* z-index: -1; */
    width: 700px; 
    height: auto;
    position: absolute;    
    bottom: -2px;
    right: -250px;
    @media ( max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
      width: 500px;
      
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 480px;
  @media ( max-width: 768px ) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 5 5px rgb( 0 0 0 / 40% ); 
    /* inset 0 0 5 5px rgb( 0 0 0 / 30%) inset 0 0 5 5px rgb( 0 0 0 / 30%); */
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba ( 0,0,0, 0.5);;
  &:hover {
    background-color: rgba( 207,207,207,0.25);
    color: rgba( 0,0,0, 0.75 );
  }

`;

export default Login;

// const mapStateToProps = (state) => (return {});
// const mapDispatchToProps = (dispatch) => ({
//   signIn : () => dispatchEvent(signInAPI()), 
// });
// export default connect( mapStateToProps, mapDispatchToProps) (Login);