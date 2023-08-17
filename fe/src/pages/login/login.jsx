import { useContext } from "react"
import './styles.css'
// import { getLogin } from '../../api/authorize'
import Home from '../home/home'
import { AuthContext } from "../../context/context"

export default function Login() {
  const context = useContext(AuthContext)
  // console.log(context.authenticated)
  // console.log(typeof(context.authenticated))
  // console.log(context.authenticated)
  if (context.authenticated==false || context.authenticated=='false') {
    
    return (
      <div className="login">
        <form onSubmit={context.handleLogin} className="login-form">
          <label htmlFor="username">Tên đăng nhập</label>
          <input value={context.email} onChange={context.handleChangeEmail} type="text" placeholder="username" id="username" name="username" />
          <label htmlFor="password">Mật khẩu</label>
          <input value={context.password} onChange={context.handleChangePassword} type="password" placeholder="*********" id="password" name="password" />
          <button type="submit" className="btn btn-primary">Đăng nhập</button>

        </form>
      </div>
    );
  }
  else {
    return (
      <Home />
    );
  }
}
