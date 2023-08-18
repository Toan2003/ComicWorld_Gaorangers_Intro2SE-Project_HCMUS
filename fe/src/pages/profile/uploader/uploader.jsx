import { Link, Outlet } from 'react-router-dom'

export default function Uploader({handleLogout}) {
    return (
        <>
            <ul className='user-list'>
                <li>
                    <Link className='link-item' to='/profile/dashboard'>Thông tin chung</Link>
                </li>
                <li>
                    <Link className='link-item' to='/profile/'>Truyện theo dõi</Link>
                </li>
                <li>
                    <Link className='link-item' to='/profile/'>Truyện đã đăng</Link>
                </li>
                <li>
                    <Link className='link-item' to='/' onClick={handleLogout}>Thoát</Link>
                </li>
            </ul>
            <Outlet />
        </>)
}