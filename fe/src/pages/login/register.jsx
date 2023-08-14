import { useState } from "react"
import './styles.css';
import {postSignup} from '../../api/authorize'

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    let result = await postSignup({email,password})
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => (setEmail(e.target.value))} type="email" placeholder="youremail@example.com" id="email" name="email"/>
        <label htmlFor="name">Tên đăng nhập</label>
        <input value={name} onChange={(e) => (setName(e.target.value))} type="text" placeholder="Nguyen Van A" name="name" id="name" />
        <label htmlFor="password">Mật khẩu</label>
        <input value={password} onChange={(e) => (setPassword(e.target.value))} type="password" placeholder="*******" id="password" name="password"/>
        <button type="submit" className="btn btn-primary">Đăng ký</button>
      </form>
    </div>
  );
}