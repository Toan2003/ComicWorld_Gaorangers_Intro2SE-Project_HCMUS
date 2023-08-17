import Member from "./member/member"
import Uploader from './uploader/uploader'
import Admin from './admin/admin'
import './styles.css'
import { useEffect, useState } from "react"
import { Link, Outlet } from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../context/context"

export default function Profile() {
  const [profileUser, setProfileUser] = useState(<Member />)
  const {handleLogout} = useContext(AuthContext)
  const username = localStorage.getItem('username')
  const typeUser = localStorage.getItem('type')

  useEffect(() => {
    if (localStorage.getItem('type') == 'member') {
      setProfileUser(<Member handleLogout={handleLogout}/>)
    }
    else if (localStorage.getItem('type') == 'uploader') {
      setProfileUser(<Uploader handleLogout={handleLogout}/>)
    }
    else {
      setProfileUser(<Admin handleLogout={handleLogout}/>)
    }
  }, [])

  return (
    <div className="profile-container">

      <div className="profile">
        <ProfileLink />
        <div className='main-profile'>
          <div className='account'>
            <div className='user-name-box'>
              <h5 className='user-name-1'>{username}</h5>
            </div>
            {profileUser}
          </div>
          <Information username={username} typeUser={typeUser}/>
        </div>
      </div>
    </div>
  );
}

function ProfileLink() {
  return (
    <>
      <ul className="profile-link-user">
        <li>
          <Link className='link-item' to='/'><p>Trang chủ</p></Link>
        </li>
        <li><p>{'>>'}</p></li>
        <li>
          <Link className='link-item' to='/profile/dashboard'><p>Thông tin chung</p></Link>
        </li>
        <Outlet />
      </ul>
    </>
  );
}

function Information({username, typeUser}) {
  console.log(username, typeUser);
  return (
    <>
    <div className='information'>
          <h4>THÔNG TIN CHUNG</h4>
          <div className='account-infor information-item'>
            <h5>Thông tin tài khoản</h5>
            {/* <Link className='edit' to='/profile/UserProfile'>Chỉnh sửa {">"}</Link> */}
          </div>
          <div className='box-account'>
            <div className='box-account-item row'>
              <p className='col'>Tên:</p>
              <p className='col'>{username}</p>
            </div>
            <div className='box-account-item row'>
              <p className='col'>Loại thành viên:</p>
              <p className='col'>{typeUser}</p>
            </div>
          </div>
          <div className='comic-follow information-item'>
            <h5>Truyện theo dõi</h5>
          </div>
          <div className='comic-follow-list row'>
            <div className='col'>TÊN TRUYỆN</div>
            <div className='col'>XEM GẦN NHẤT</div>
            <div className='col'>CHAPTER MỚI NHẤT</div>
          </div>
        </div>
    </>
  );
}
