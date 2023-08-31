import { Link, Outlet } from 'react-router-dom'

export default function Admin({ handleLogout, setIsOnManageAccount }) {

    return (
        <>
            <ul className='user-list'>
                <li>
                    <Link className='link-item' onClick={() => setIsOnManageAccount(false)} to='/profile/dashboard'>Thông tin chung</Link>
                </li>
                <li>
                    <Link className='link-item' onClick={() => setIsOnManageAccount(false)} to='/profile/upload'>Thêm truyện</Link>
                </li>
                <li>
                    <Link className='link-item' onClick={() => setIsOnManageAccount(true)}>Quản lý account</Link>
                </li>
                <li>
                    <Link className='link-item' onClick={() => setIsOnManageAccount(false)} to='/profile/create-group'>Đăng kí nhóm tác giả</Link>
                </li>
                <li>
                    <Link className='link-item' onClickCapture={() => setIsOnManageAccount(false)} to='/profile/add-member'>Thêm thành viên</Link>
                </li>
                <li>
                    <Link className='link-item' to='/' onClick={handleLogout}>Thoát</Link>
                </li>
                <li></li>
            </ul>
            <Outlet />
        </>)
}