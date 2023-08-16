import { useState, createContext } from 'react';
import { getLogin, postSignup } from '../api/authorize';

export const AuthContext = createContext()
export function AuthProvider({children}) {
  const [authenticated, setAuthenticated] = useState((localStorage.getItem('authenticated') || false))
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // localStorage.setItem("idComic", idComic);

  const handleLogin = async (e) => {
    e.preventDefault();
    let checkLogin = await getLogin({email, password});

    checkLogin = checkLogin.data
    
    // console.log(localStorage.getItem('authenticated')) 
    setAuthenticated(checkLogin.isSuccess);
    if (checkLogin.isSuccess == true) {
      localStorage.setItem('authenticated', checkLogin.isSuccess);
      // localStorage.setItem('status', checkLogin.status);
      // localStorage.setItem('messages', checkLogin.message);
      localStorage.setItem('type', checkLogin.data.type);
      localStorage.setItem('id', checkLogin.data.id);
    } else {
      localStorage.setItem('authenticated', false);
    }
    // console.log(authenticated)
    setEmail("");
    setPassword("");
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let register = await postSignup({email, password});

    register = register.data
    
    // console.log(localStorage.getItem('authenticated')) 
    setAuthenticated(register.isSuccess);
    console.log(register.isSuccess);
    if (register.isSuccess == true) {
      localStorage.setItem('authenticated', register.isSuccess);
      // localStorage.setItem('status', register.status);
      // localStorage.setItem('messages', register.message);
      localStorage.setItem('type', register.data.type);
      localStorage.setItem('id', register.data.id);
    } else {
      localStorage.setItem('authenticated', false);
      alert(register.message)
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
    handleLogin,
    handleRegister,
    handleChangeEmail,
    handleChangePassword,
    authenticated,
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
