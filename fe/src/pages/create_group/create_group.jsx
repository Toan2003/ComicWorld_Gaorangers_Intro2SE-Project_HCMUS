import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
// import { useParams } from 'react-router-dom'

export default function CreateGroup() {
    const [groupName, setGroupName] = useState([])
    const [groupMember, setGroupMember] = useState([])
    const [desciption, setDescription] = useState([])
    // const {id} = useParams()

    return (
        <div className="create-group-container">
            <div className="create-group-main">
                <div className="center">
                    <ul className="link">
                        <li>
                            <Link className='link-item' to='/'>Trang chủ</Link>
                        </li>
                        <li><p>{'>>'}</p></li>
                        <li>
                            <Link className='link-item' to='/profile/create-group'>Tạo nhóm đăng truyện</Link>
                        </li>
                        <Outlet />
                    </ul>
                </div>
                <div className='create-group-form-container'>
                    <form className="create-group-form-name">
                        <input type="text" placeholder="Nhập tên nhóm" value={groupName} onChange={(e) => (setGroupName(e.target.value))} className="create-group-input-name" />
                        <button type="submit" className="btn btn-primary create-group-form-name-btn">Tạo</button>
                    </form>
                    {/* <form className="create-group-form-member">
                        <input type="text" placeholder="Nhập tên thành viên" value={groupName} onChange={(e) => (setGroupName(e.target.value))} className="create-group-input-member" />
                        <button type="submit" className="btn btn-primary create-group-form-member-btn">Thêm</button>
                    </form> */}
                    <form className='create-group-form-description'>
                        <textarea type="text" placeholder='Nhập mô tả về nhóm' value={desciption} onChange={(e) => (setDescription(e.target.value))} className="create-group-input-description"/>
                    </form>
                    <div className="create-group-"></div>
                </div>

            </div>
        </div>
    );
}