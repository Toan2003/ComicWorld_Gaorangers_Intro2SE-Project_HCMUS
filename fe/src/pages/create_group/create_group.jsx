import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createGroup } from '../../api/group'
import './create_group.css'
import CatImage from '../../assets/meo-cute.jpg'

// import { useParams } from 'react-router-dom'

export default function CreateGroup() {
    const [groupName, setGroupName] = useState("")
    // const [groupMember, setGroupMember] = useState([])
    const [description, setDescription] = useState("")

    async function handleSubmitCreateGroup(e) {
        e.preventDefault()

        const onCreatedGroup = await createGroup(groupName, description)
        if(onCreatedGroup.data.isSuccess) 
            alert("Đăng ký tác giả thành công!!!")
        else 
            alert(onCreatedGroup.data.message)

        setGroupName("")
        setDescription("")
    }
    
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
                            <Link className='link-item' to='/profile/create-group'>Đăng ký tác giả</Link>
                        </li>
                        <Outlet />
                    </ul>
                </div>
                <div className='create-group-body'>
                    <div className='create-group-form-image-container'>
                        <img className='create-group-form-image'src={CatImage} alt="" />
                    </div>
                    <div className='create-group-form-container'>
                        <form className="create-group-form-name" onSubmit={handleSubmitCreateGroup}>
                            <div className='create-group-grid'>
                                <labal className='create-group-form-label'>Tên nhóm</labal>
                                <input type="text" placeholder="Nhập tên nhóm" value={groupName} onChange={(e) => (setGroupName(e.target.value))} className="create-group-input-name" />
                                <label className='create-group-form-label'>Mô tả nhóm</label>
                                <textarea type="text" placeholder='Nhập mô tả về nhóm' value={description} onChange={(e) => (setDescription(e.target.value))} className="create-group-input-description"/>
                            </div>
                            <button type="submit" className="btn btn-primary create-group-form-name-btn">Tạo</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}