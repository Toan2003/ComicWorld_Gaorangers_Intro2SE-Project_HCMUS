import { Link, Outlet } from 'react-router-dom'

export default function Admin({handleLogout}) {
    return (
        <>
            <ul className='user-list'>
                <li>
                    <Link className='link-item' to='/profile/dashboard'>Thông tin chung</Link>
                </li>
                <li>
                    <Link className='link-item' to='/' onClick={handleLogout}>Thoát</Link>
                </li>
            </ul>
            <Outlet />
        </>)
}