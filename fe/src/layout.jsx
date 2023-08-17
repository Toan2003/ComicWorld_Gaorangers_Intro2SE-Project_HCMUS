import { Link, Outlet, redirect } from 'react-router-dom'
import LOGO from './assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { AuthContext } from './context/context'
import { useContext, useState } from 'react'
import DefaultAvatar from './assets/default-avatar.jpg'

export default function Layout() {
  const {authenticated} = useContext(AuthContext)
  const checkAuthen = JSON.parse(localStorage.getItem('authenticated'))
<<<<<<< HEAD
  
=======
  const { isAuthenticated } = useContext(AuthContext)
  console.log(checkAuthen)
>>>>>>> 86ccc0fcf9415afcf09fee3f708c801eb3ad3075
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
          <div className="header-search_bar-btn">
            {
              inputText.length > 0 ?
              (
                <Link className="header-search_bar-link" to={"/search-result?key=" + inputText}>
                <AiOutlineSearch className="header-search_bar-icon"></AiOutlineSearch>
                </Link>
              )
              :
              (
                <Link className="header-search_bar-link" >
                <AiOutlineSearch className="header-search_bar-icon"></AiOutlineSearch>
                </Link>
              )
            }
          </div>
        </div>
<<<<<<< HEAD
        {
          authenticated ? 
          (<Link to='/profile/dashboard' className='layout-profile'>
            <img src={DefaultAvatar} alt="" className='layout-profile-avatar' />
          </Link>) 
          : 
          (<div className="header-login_register-wrap">
              <Link to="/login" className="header-login_register">Đăng Nhập</Link>
              <Link to="/register" className="header-login_register">Đăng Kí</Link>
            </div>)
        }
=======
        {checkAuthen ? 
        (<Link to='/profile/dashboard' className='layout-profile'>
          <img src={DefaultAvatar} alt="" className='layout-profile-avatar' />
        </Link>) : 
        (<div className="header-login_register-wrap">
          <Link to="/login" className="header-login_register">Đăng Nhập</Link>
          <Link to="/register" className="header-login_register">Đăng Kí</Link>
        </div>)}
>>>>>>> 86ccc0fcf9415afcf09fee3f708c801eb3ad3075
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
