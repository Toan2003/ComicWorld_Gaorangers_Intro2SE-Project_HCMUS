import { Link, Outlet } from 'react-router-dom'

export default function Member() {
  const username = "NQQUY21"
  const name = "Quốc Quý"
  const email = "abc@example.com"

  return (
    <div className="member">
      <ul className="link-member">
        <li>
          <Link className='link-item' to='/'><p>Trang chủ</p></Link>
        </li>
        <li><p>{'>>'}</p></li>
        <li>
          <Link className='link-item' to='/profile/dashboard'><p>Thông tin chung</p></Link>
        </li>
        <Outlet />
      </ul>
      <div className='main-member'>
        <div className='account'>
          <div className='user-name-box'>
            <h5 className='user-name-1'>{username}</h5>
          </div>
          <ul className='user-list'>
            <li>
              <Link className='link-item' to='/profile/dashboard'>Thông tin chung</Link>
            </li>
            <li>
              <Link className='link-item' to='/profile/UserProfile'>Thông tin tài khoản</Link>
            </li>
            <li>
              <Link className='link-item' to='/profile/ComicFollow'>Truyện theo dõi</Link>
            </li>
            <li>
              <Link className='link-item' to='/profile/ChangePassword'>Đổi mật khẩu</Link>
            </li>
            <li>
              <Link className='link-item' to='/'>Thoát</Link>
            </li>
          </ul>
        </div>
        <div className='information'>
          <h4>THÔNG TIN CHUNG</h4>
          <div className='account-infor information-item'>
            <h5>Thông tin tài khoản</h5>
            <Link className='edit' to='/profile/UserProfile'>Chỉnh sửa {">"}</Link>
          </div>
          <div className='box-account'>
            <div className='box-account-item row'>
              <p className='col'>Tên:</p>
              <p className='col'>{name}</p>
            </div>
            <div className='box-account-item row'>
              <p className='col'>Email:</p>
              <p className='col'>{email}</p>
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
      </div>
    </div>
  );
}