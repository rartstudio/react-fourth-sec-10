import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // useEffect will help you not running code after checking login cause it will run in to infinite loop
  // so it will run just once after functional component 
  // runs after every component render cycle
  useEffect(()=>{
    const storedUserLoggedInInformation = localStorage.getItem('loggedIn');
    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  },[]);


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('loggedIn','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;