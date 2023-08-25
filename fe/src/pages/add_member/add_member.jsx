import './add_member.css';
import { BiSolidDownArrow } from "react-icons/bi";
import { useState, useEffect} from 'react';
import { returnGroup, addMemberToGroup } from "../../api/group"
import { Link, useNavigate } from 'react-router-dom'
import AddMemberImg from '../../assets/add_member.png'

export default function AddMember() {
    const [seclected, setSeclected] = useState("Chọn tên nhóm");
    const [groupList, setGroupList] = useState([]);
    const [seclectedId, setSeclectedId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

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

    function navigateToHome() {
        navigate("/")
    }

    async function handleAddMember() {
        setDisabled(true)
        const check = await addMemberToGroup(seclected, username)
        console.log(check)

        if (check.data.isSuccess) {
            alert("Thêm thành viên vào nhóm dịch thành công!")
            navigate("/")
            setDisabled(false)
        }
        else {
            alert("Thêm thành viên vào nhóm dịch thất bại\n\nVui lòng kiểm tra lại tên người dùng có tồn tại hay không \nhoặc người dùng đã có ở trong nhóm dịch này chưa")
            setDisabled(false)
        }
    }

    useEffect(() => {
        loadDataPage()
    },[])

    return (
        <div className="add_member-container">
            <div className="add_member-body">
                <h3 className="add_member-title">Thêm thành viên vào nhóm</h3>
                <img src={AddMemberImg} alt="" className="add_member-img" />
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
                        <button disabled={disabled} onClick={() => handleAddMember()} className="add_member-submit_btn">Xác nhận</button>
                        <button disabled={disabled} onClick={() => navigateToHome()} className="add_member-submit_btn">Hủy</button>
                    </span>
                </div>
            </div>
        </div>    
    )
}