import { useContext } from "react"
import './styles.css';
import Home from '../home/home'
import { AuthContext } from "../../context/context"

export default function Register() {
  const context = useContext(AuthContext)
  
  if (!context.authenticated) {
    return (
      <div className="register">
        <form onSubmit={context.handleRegister} className="register-form">
        <label htmlFor="username">Tên đăng nhập</label>
            <input value={context.email} onChange={context.handleChangeEmail} type="text" placeholder="username" id="username" name="username" />
          <label htmlFor="password">Mật khẩu</label>
          <input value={context.password} onChange={context.handleChangePassword} type="password" placeholder="*******" id="password" name="password"/>
          <button type="submit" className="btn btn-primary">Đăng ký</button>
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