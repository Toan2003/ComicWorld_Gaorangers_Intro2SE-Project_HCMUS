import { useState, createContext } from 'react';
import { getLogin, postSignup } from '../api/authorize';
import { useHistory } from 'react-router-dom';



export const AuthContext = createContext()
export function AuthProvider({children}) {
  const [authenticated, setAuthenticated] = useState((JSON.parse(localStorage.getItem('authenticated')) || false))
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idUser, setIDUser] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [name, setName] = useState("")

  // set local storage
  function setLocalStorage(authenticated, id, type, username) {
    localStorage.setItem("username", username)
    localStorage.setItem("authenticated", authenticated)
    localStorage.setItem("id", id)
    localStorage.setItem("type", type)
  }

  // function Logout
  const handleLogout =  () => {
    setAuthenticated(!authenticated)
    setLocalStorage(!authenticated, null, null, null)
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
      setName(email)
      setLocalStorage(checkLogin.isSuccess, checkLogin.data.id, checkLogin.data.type, email)
    } else {
      setLocalStorage(false, null, null, null)
      alert(checkLogin.message)
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
      setName(email)
      setLocalStorage(register.isSuccess, register.data.id, register.data.type, email)
    } else {
      setLocalStorage(false, null, null, null)
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
    name,
    handleLogin,
    handleRegister,
    handleChangeEmail,
    handleChangePassword,
    handleLogout,
    authenticated,
    idUser,
    typeUser,
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}