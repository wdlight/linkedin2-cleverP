import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Header from "./components/Header";
import Home from "./components/Home";
import { useEffect } from 'react';

import {  getUserAPI } from "./actions/index.js"
function App() {

  // const user = useSelector( selectUser );

  // const [ logon , setLogon] = useState(false); 
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {       
  //     setLogon( !logon );      
  //     console.log ( "useEffect>>" + user )
  //   });
  // }, [] )


  return (
    <div className="App">      
      <Router>
        <Routes>                    
            <Route path='/' element={<Login/>} />
            <Route path='/home' element={<><Header/><Home/></>} />   
        </Routes>      
      </Router>           
    </div>
  );
}


export default App;
