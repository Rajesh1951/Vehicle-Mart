import axios from "axios";
import React, { useEffect } from 'react';

const MyContext = React.createContext();

export const MyProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = React.useState(null);
  
  const login = async () => {
    // login logic
    const result = await axios.get('http://localhost:400/loggedIn');
    setLoggedIn(result.data);
  };
  useEffect(()=>{
    login();
  },[])
  const logout = async () => {
    // Perform logout logic here
    const result = await axios.get('http://localhost:400/loggedIn');
    setLoggedIn(result.data);
  };

  return (
    <MyContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
