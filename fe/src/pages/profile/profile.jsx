import Member from "./member/member"
import Uploader from './uploader/uploader'
import Admin from './admin/admin'
import './styles.css'
import { useEffect, useState } from "react"
import { Link, Outlet } from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../context/context"
import { getFollowedComic, getReturnComicByUploader } from "../../api/comic"
import { GrView } from 'react-icons/gr'
import { AiOutlineSearch } from 'react-icons/ai'
import { getSearchUser, postChangeRole } from '../../api/user'
import { BiSolidDownArrow } from "react-icons/bi";

export default function Profile() {
  const [profileUser, setProfileUser] = useState(<Member />)
  const [follow, setFollow] = useState([])
  const [upload, setUpload] = useState([])
  const [isOnManageAccount, setIsOnManageAccount] = useState(false)
  const { handleLogout } = useContext(AuthContext)
  const username = localStorage.getItem('username')
  const typeUser = localStorage.getItem('type')

  async function loadData() {
    let id = localStorage.getItem('id')
    const follows = await getFollowedComic(id)
    const uploads = await getReturnComicByUploader(id)

    if (localStorage.getItem('type') === 'member') {
      setProfileUser(<Member handleLogout={handleLogout} />)
    }
    else if (localStorage.getItem('type') === 'uploader') {
      setProfileUser(<Uploader handleLogout={handleLogout} />)
    }
    else {
      setProfileUser(<Admin handleLogout={handleLogout} setIsOnManageAccount={setIsOnManageAccount} />)
    }
    if (id != 'null') {
      setFollow(follows.data.data.followList.fullComic)
      setUpload(uploads.data.data.listComic)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="profile-container">
      <div className="profile">
        <ul className="profile-link-user">
          <li>
            <Link className='link-item' to='/'><p>Trang chủ</p></Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link-item' to='/profile/dashboard'><p>{isOnManageAccount ? "Quản lý account" : "Thông tin chung"}</p></Link>
          </li>
          <Outlet />
        </ul>
        <div className='main-profile'>
          <div className='account'>
            <div className='user-name-box'>
              <h5 className='user-name-1'>{username}</h5>
            </div>
            {profileUser}
          </div>
          {
            !isOnManageAccount ?
              <Information username={username} typeUser={typeUser} follow={follow} upload={upload} /> :
              <ManageAccount />
          }
        </div>
      </div>
    </div>
  );
}

function Information({ username, typeUser, follow, upload }) {
  return (
    <>
      <div className='information'>
        <h4>THÔNG TIN CHUNG</h4>
        <div className='profile-account information-item'>
          <h5 className="information-item-name">Thông tin tài khoản</h5>
          <div className='profile-box-account'>
            <div className='box-account-item row'>
              <p className='col box-account-item-1'>Tên:</p>
              <p className='col box-account-item-2'>{username}</p>
            </div>
            <div className='box-account-item row'>
              <p className='col box-account-item-1'>Loại thành viên:</p>
              <p className='col box-account-item-2'>{typeUser}</p>
            </div>
          </div>
          {/* <Link className='edit' to='/profile/UserProfile'>Chỉnh sửa {">"}</Link> */}
        </div>
        {/* Truyện theo dõi */}
        <div className="profile-list-followed-comic information-item">
          <h5 className="information-item-name">Truyện theo dõi</h5>
          <div className='profile-list-followed-header row'>
            <div className='col comic-follow-item-col'>TÊN TRUYỆN</div>
            <div className='col comic-follow-item-col'>LƯỢT XEM</div>
            <div className='col comic-follow-item-col'>CHAPTER MỚI NHẤT</div>
          </div>
          {
            (
              follow.map((f) => {
                return (
                  <div className="comic-follow-list-item-row row">
                    <Link className="col comic-follow-item-col comic-follow-item-1">
                      <img src={f.coverURL} alt="" className="comic-follow-item-image" />
                      <h3 className="comic-follow-item-name">{f.nameComics}</h3>
                    </Link>
                    <div className="col comic-follow-item-col">{f.view} <GrView /></div>
                    <div className="col comic-follow-item-col">{f.chapters.length}</div>
                  </div>
                )
              })
            )
          }
        </div>
        {/* Truyện đã đăng */}
        <div className="profile-list-upload-comic information-item">
          <h5 className="information-item-name">Truyện đã đăng</h5>
          <div className='profile-list-upload-header row'>
            <div className='col comic-upload-item-col'>TÊN TRUYỆN</div>
            <div className='col comic-upload-item-col'>NGUỜI ĐĂNG</div>
            <div className='col comic-upload-item-col'>THÊM CHAPTER MỚI</div>
          </div>
          {
            upload.map((u) => {
              return (
                <div className="comic-follow-list-item-row row">
                  <Link className="col comic-follow-item-col comic-follow-item-1">
                    <img src={u.coverURL} alt="" className="comic-follow-item-image" />
                    <h3 className="comic-follow-item-name">{u.nameComics}</h3>
                  </Link>
                  <div className="col comic-follow-item-col">{u.Uploading.group}</div>
                  <div className="col comic-follow-item-col">
                    <button className="btn btn-success">Thêm chap mới</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}


const ManageAccount = () => {
  const [searchName, setSearchName] = useState([])
  const [searchResult, setSearchResult] = useState(undefined)
  const [role, setRole] = useState([])
  const [nameChangeRole, setNameChangeRole] = useState("")

  const handleSubmitSearchAccount = (e) => {
    e.preventDefault()
    handleSearch(searchName)
    setNameChangeRole(searchName)
    setSearchName("")
  }

  const handleChange = (e) => {
    setSearchName(e.target.value)
  }

  async function handleSearch(query) {
    const users = await getSearchUser(query)
    setSearchResult(users?.data?.data?.user?.username)
    // console.log(users?.data?.data?.user?.Role)
    setRole(users?.data?.data?.user?.Role)
  }

  async function handleChangeRole() {
    console.log(searchName)
    const changeRole = await postChangeRole(nameChangeRole, role)
    console.log(changeRole.data)
  }

  return (
    <div className='information'>
      <h4>QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG</h4>
      <div className="profile-manage-account-comic information-item">
        <h5 className="information-item-name">DANH SÁCH</h5>
        {/* <SearchAccount handleSearch={handleSearch}/> */}
        <div className="profile-search-account-box">
          <form onSubmit={handleSubmitSearchAccount} className="profile-search-account-form">
            <input type="text" placeholder="Tìm tên người dùng..." value={searchName} onChange={handleChange} className="profile-search-account-input" />
            <button type="submit" className="profile-search-account-button"><AiOutlineSearch /></button>
          </form>
        </div>
        <div className='profile-manage-account-header row'>
          <div className='col comic-manage-item-col'>NGƯỜI DÙNG</div>
          <div className='col comic-follow-item-col'>CHỨC NĂNG</div>
        </div>
        {
          searchResult ?
            (
              <div className="profile-mange-account-user row">
                <div className='col comic-manage-item-col'>{searchResult}</div>
                <div className='col comic-follow-item-col'>
                  <div name="role" id="role" className="role-selection">
                    {role}
                    <BiSolidDownArrow className="role-selection-icon"></BiSolidDownArrow>
                    <ul className="role-selection-list">
                      <option onClick={(e) => { setRole(e.target.value) }} className="role-selection-item" value="member">member</option>
                      <option onClick={(e) => { setRole(e.target.value) }} className="role-selection-item" value="uploader">uploader</option>
                      <option onClick={(e) => { setRole(e.target.value) }} className="role-selection-item" value="admin">admin</option>
                    </ul>
                  </div>
                </div>
                <div className="save-role-selection">
                  <button onClick={handleChangeRole} className="btn btn-success save-role-btn">Save</button>
                </div>
              </div>
            ) :
            (
              <div>No information</div>
            )
        }
        {/* <div className="profile-manage-"></div> */}
      </div>
    </div>
  );
}
