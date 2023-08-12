import { useState } from "react"
import './styles.css'
import {getLogin} from '../../api/authorize'
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = getLogin(email, password)
    console.log(result)
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => (setEmail(e.target.value))} type="email" placeholder="youremail@example.com" id="email" name="email"/>
        <label htmlFor="password">Mật khẩu</label>
        <input value={password} onChange={(e) => (setPassword(e.target.value))} type="password" placeholder="*********" id="password" name="password"/>
        <button type="submit" className="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  );
}