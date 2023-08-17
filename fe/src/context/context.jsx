import { useState, createContext } from 'react';
import { getLogin, postSignup } from '../api/authorize';

export const AuthContext = createContext()
export function AuthProvider({children}) {
  const [authenticated, setAuthenticated] = useState((JSON.parse(localStorage.getItem('authenticated')) || false))
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idUser, setIDUser] = useState("");
  const [typeUser, setTypeUser] = useState("");

  // function Logout
  const handleLogout = () => {
    
  }

  // function Login
  const handleLogin = async (e) => {
    e.preventDefault();
    let checkLogin = await getLogin({email, password});

    checkLogin = checkLogin.data
    
    setAuthenticated(checkLogin.isSuccess);
    setIDUser(checkLogin.data.id);
    setTypeUser(checkLogin.data.type);

    if (checkLogin.isSuccess == true) {
      localStorage.setItem('authenticated', checkLogin.isSuccess);
      localStorage.setItem('type', checkLogin.data.type);
      localStorage.setItem('id', checkLogin.data.id);
    } else {
      localStorage.setItem('authenticated', false);
    }
    
    setEmail("");
    setPassword("");
  }

  // function Register
  const handleRegister = async (e) => {
    e.preventDefault();
    let register = await postSignup({email, password});

    register = register.data
    
    setAuthenticated(register.isSuccess);
    setIDUser(register.data.id);
    setTypeUser(register.data.type);

    if (register.isSuccess == true) {
      localStorage.setItem('authenticated', register.isSuccess);
      localStorage.setItem('type', register.data.type);
      localStorage.setItem('id', register.data.id);
    } else {
      localStorage.setItem('authenticated', false);
      alert(register.message)
    }

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
    idUser,
    typeUser
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
