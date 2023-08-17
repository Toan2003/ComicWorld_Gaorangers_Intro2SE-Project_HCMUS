import { Link, Outlet } from 'react-router-dom'

export default function Member({handleLogout}) {
  return (
    <>
      <ul className='user-list'>
        <li>
          <Link className='link-item' to='/profile/dashboard'>Thông tin chung</Link>
        </li>
        <li>
          <Link className='link-item' to='/profile/ComicFollow'>Truyện theo dõi</Link>
        </li>
        <li>
          <Link className='link-item' to='/' onClick={handleLogout}>Thoát</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}