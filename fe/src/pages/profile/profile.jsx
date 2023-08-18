import Member from "./member/member"
import Uploader from './uploader/uploader'
import Admin from './admin/admin'
import './styles.css'
import { useEffect, useState } from "react"
import { Link, Outlet } from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../context/context"
import { getFollowedComic } from "../../api/comic"

export default function Profile() {
  const [profileUser, setProfileUser] = useState(<Member />)
  const [follow, setFollow] = useState([])
  const { handleLogout } = useContext(AuthContext)
  const username = localStorage.getItem('username')
  const typeUser = localStorage.getItem('type')

  async function loadData() {
    const follows = await getFollowedComic(localStorage.getItem('id'))
    if (localStorage.getItem('type') === 'member') {
      setProfileUser(<Member handleLogout={handleLogout} />)
    }
    else if (localStorage.getItem('type') === 'uploader') {
      setProfileUser(<Uploader handleLogout={handleLogout} />)
    }
    else {
      setProfileUser(<Admin handleLogout={handleLogout} />)
    }
    setFollow(follows.data.data.followList.fullComic)

    console.log(follows.data.data.followList.fullComic)
  }

  useEffect(() => {
    loadData()
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
          <Information username={username} typeUser={typeUser} follow={follow} />
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

function Information({ username, typeUser, follow }) {
  console.log(follow)
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
          <div className='col'>THEO DÕI</div>
          <div className='col'>CHAPTER MỚI NHẤT</div>
        </div>
        {
          follow ?
          (
            follow.map((f) => {
              return(
                <div className="comic-follow-list-item-row row">
                  <Link className="col comic-follow-item-col">
                    <img src={f.coverURL} alt="" className="comic-follow-item-image"/>
                    <h3 className="comic-follow-item-name">{f.nameComics}</h3>
                  </Link>
                  <div className="col comic-follow-item-col-1 ">
                    <button className="btn btn-danger btn-follow">Bỏ theo dõi</button>
                  </div>
                  <div className="col comic-follow-item-col-1">{f.chapters.length}</div>
                </div>              
              )
            })
          ) :
          (
            <div>{follow}</div>
          )
        }
      </div>
    </>
  );
}
