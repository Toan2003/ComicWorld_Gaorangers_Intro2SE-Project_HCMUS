import { Link, Outlet } from 'react-router-dom'
import LOGO from './assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { AuthContext } from './context/context'
import { useContext, useState } from 'react'
 
export default function Layout() {
  const context = useContext(AuthContext)
  const checkAuthen = localStorage.getItem('authenticated')

  // handle search bar
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-logo">
          <Link to="/" className="header-logo-link">
            <img src={LOGO} alt="" className='header-logo-img' />
          </Link>
        </div>

        <div className="header-search_bar">
          <input type="text" onChange={inputHandler} placeholder="Nhập từ khóa tìm kiếm" className="header-search_bar-input" />
          <button className="header-search_bar-btn">
            <Link className="header-search_bar-link" to={"/search-result?key=" + inputText}>
              <AiOutlineSearch className="header-search_bar-icon"></AiOutlineSearch>
            </Link>
          </button>
        </div>

        {
          checkAuthen == 'true' && context.authenticated ? 
          (<Link to='/profile/dashboard'>profile</Link>) 
          : 
          (<div className="header-login_register-wrap">
              <Link to="/login" className="header-login_register">Đăng Nhập</Link>
              <Link to="/register" className="header-login_register">Đăng Kí</Link>
            </div>)
        }
      </div>

      <div className="header-sticky_nav">
        <ul className="header-sticky_nav-list">
          <li>
            <Link to="/" className="header-sticky_nav-item">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/type-comic" className="header-sticky_nav-item">Thể Loại</Link>
          </li>
          <li>
            <Link to="/follow" className="header-sticky_nav-item">Theo Dõi</Link>
          </li>
        </ul>
      </div>
      
      <Outlet/>
    </div>
  )
}
