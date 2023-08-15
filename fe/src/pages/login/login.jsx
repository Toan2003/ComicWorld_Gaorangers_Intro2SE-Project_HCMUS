import { useContext, useState } from "react"
import './styles.css'
// import { getLogin } from '../../api/authorize'
import Profile from '../profile/profile'
import { AuthContext } from "../../context/context"

function Login() {
  const context = useContext(AuthContext)
  // console.log(context.authenticated)
  
  if (!context.authenticated) {
    return (
      <div className="login">
        <form onSubmit={context.handleSubmit} className="login-form">
          <label htmlFor="username">Email</label>
          <input value={context.email} onChange={context.handleChangeEmail} type="text" placeholder="youremail@example.com" id="username" name="username" />
          <label htmlFor="password">Mật khẩu</label>
          <input value={context.password} onChange={context.handleChangePassword} type="password" placeholder="*********" id="password" name="password" />
          <button type="submit" className="btn btn-primary">Đăng nhập</button>

        </form>
      </div>
    );
  }
  else {
    return (
      <Profile />
    );
  }
}

export { Login } 