import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createGroup } from '../../api/group'
// import { useParams } from 'react-router-dom'

export default function CreateGroup() {
    const [groupName, setGroupName] = useState("")
    // const [groupMember, setGroupMember] = useState([])
    const [description, setDescription] = useState("")

    function handleSubmitCreateGroup(e) {
        e.preventdefault()
        // console.log(onCreatedGroup)
        setGroupName("")
        setDescription("")
    }
    async function loadData() {
        const onCreatedGroup = await createGroup(groupName, description)
    }

    useEffect(() => {
        loadData()
    }, [groupName])
    

    
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
                    <form className="create-group-form-name" onSubmit={handleSubmitCreateGroup}>
                        <input type="text" placeholder="Nhập tên nhóm" value={groupName} onChange={(e) => (setGroupName(e.target.value))} className="create-group-input-name" />
                        <textarea type="text" placeholder='Nhập mô tả về nhóm' value={description} onChange={(e) => (setDescription(e.target.value))} className="create-group-input-description"/>
                        <button type="submit" className="btn btn-primary create-group-form-name-btn">Tạo</button>
                    </form>
                    <div className="create-group-"></div>
                </div>
            </div>
        </div>
    );
}