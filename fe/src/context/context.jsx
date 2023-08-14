import { useState, createContext } from 'react';
import { getLogin } from '../api/authorize';

export const AuthContext = createContext()
export function AuthProvider({children}) {
  const [authenticated, setAuthenticated] = useState((localStorage.getItem('authenticated') || false))
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkLogin = await getLogin({email, password});

    // const checkLogin = {
    //   "isSuccess": true,
    //   "message": "none",
    //   "status": 200,
    //   "data": "none"
    // }
    checkLogin = checkLogin.data
    // console.log(checkLogin)
    // console.log(checkLogin.isSuccess)
    
    // console.log(localStorage.getItem('authenticated')) 
    setAuthenticated(checkLogin.isSuccess);
    if (checkLogin.isSuccess == true) {
      localStorage.setItem('authenticated', true);
    } else {
      localStorage.setItem('authenticated', false);
    }
    // console.log(authenticated)
    setEmail("");
    setPassword("");
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }


  const value = {
    email,
    password,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
    authenticated
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
