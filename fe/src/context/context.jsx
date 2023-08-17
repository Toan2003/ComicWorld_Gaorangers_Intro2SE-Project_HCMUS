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
  // const [isLogout, setIsLogout] = useState(false);
  const [name, setName] = useState("")

  // const history = useHistory()
  // function Logout
  const handleLogout =  () => {
    setAuthenticated(false)
    localStorage.removeItem("name")
    localStorage.setItem("authenticated", false)
    localStorage.setItem("id", null)
    localStorage.setItem("type", null)
    // setIsLogout(!isLogout)
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
      localStorage.setItem('authenticated', checkLogin.isSuccess);
      localStorage.setItem('type', checkLogin.data.type);
      localStorage.setItem('id', checkLogin.data.id);
      localStorage.setItem('username', name)
    } else {
      localStorage.setItem('authenticated', false);
      localStorage.setItem('type', null);
      localStorage.setItem('id', null);
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
      localStorage.setItem('authenticated', register.isSuccess);
      localStorage.setItem('type', register.data.type);
      localStorage.setItem('id', register.data.id);
      localStorage.setItem('username', name);
    } else {
      localStorage.setItem('authenticated', false);
      localStorage.setItem('type', null);
      localStorage.setItem('id', null);
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