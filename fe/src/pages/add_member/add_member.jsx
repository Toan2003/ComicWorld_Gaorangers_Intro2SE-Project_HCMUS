import './add_member.css';
import { BiSolidDownArrow } from "react-icons/bi";
import { useState, useEffect} from 'react';
import { returnGroup } from "../../api/group"
import { Link } from 'react-router-dom'

export default function AddMember() {
    const [seclected, setSeclected] = useState("Chọn tên nhóm");
    const [groupList, setGroupList] = useState([]);
    const [seclectedId, setSeclectedId] = useState('');
    const [username, setUsername] = useState('');
    
    const handleSeclectGroup = (e) => {
        setSeclected(e.target.innerText);
        setSeclectedId(e.target.value);
    };


    async function loadDataPage() {
        const result = await returnGroup()
        setGroupList(result.data.data.group)
    }

    function inputHandler(e) {
        setUsername(e.target.value)
    }

    useEffect(() => {
        loadDataPage()
    },[])

    return (
        <div className="add_member-container">
            <div className="add_member-body">
                <h3 className="add_member-title">Thêm thành viên vào nhóm</h3>
                <div className="add_member-form">
                    <span className="add_member-input_section">
                        <h4 className="add_member-sub_title">Tên nhóm</h4>
                        <div className="add_member-list-wrap">
                            {seclected} 
                            {
                                groupList ?
                                (
                                    <ul className="add_member-list">
                                    { 
                                        groupList.map((cur, index) => 
                                        <option onClick={(e) => handleSeclectGroup(e)} value={cur._id} className="add_member-list_item" key={index}>{cur.groupName}</option>)
                                    }
                                    </ul>
                                )
                                : null
                            }
                            <BiSolidDownArrow className="add_member-list-icon"/>
                        </div>
                        <h4 className="add_member-sub_title">Username</h4>
                        <input onChange={(e) => inputHandler(e)} type="text" className="add_member-input" placeholder="Nhập tên người dùng muốn thêm"/>
                    </span>

                    <span className="add_member-button_section">
                        <button on className="add_member-submit_btn">Xác nhận</button>
                        <Link className="add_member-submit_btn">Hủy</Link>
                    </span>
                </div>
            </div>
        </div>    
    )
}