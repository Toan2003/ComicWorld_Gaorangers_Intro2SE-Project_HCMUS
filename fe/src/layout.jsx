import { Link, Outlet } from 'react-router-dom'
import LOGO from './assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'

const checkAuthen = false

export default function Layout() {
  return (
    <>
      <nav className="header">
        <ul className="static-nav">
          <li>
            <Link to="/" className="header-item header-item-1">
              <img src={LOGO} alt="" />
            </Link>
          </li>
          <li>
            <div className="search-bar header-item header-item-1">
              <input type="text" placeholder='Nhập từ khóa tìm kiếm'/>
              <button><AiOutlineSearch color='#FFFF'/></button>
            </div>
          </li>
          {checkAuthen ? 
          (<li>
            profile
          </li>) : 
          (<li>
            <Link to="/login" className="header-item header-item-1">Đăng Nhập / </Link>
            <Link to="/register" className="header-item header-item-1">Đăng Kí</Link>
          </li>)}
        </ul>
        <ul className="sticky-nav">
          <li>
            <Link to="/" className="header-item header-item-2">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/comic" className="header-item header-item-2">Thể Loại</Link>
          </li>
          <li>
            <Link to="/follow" className="header-item header-item-2">Theo Dõi</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}