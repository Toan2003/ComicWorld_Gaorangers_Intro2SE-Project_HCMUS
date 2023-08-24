import './add_member.css';
import { BiSolidDownArrow } from "react-icons/bi";
import { useState, useRef, useEffect} from 'react';

export default function AddMember() {
    const [seclected, setSeclected] = useState("Chọn tên nhóm");

    return (
        <div className="add_member-container">
            <div className="add_member-body">
                <h3 className="add_member-title">Thêm thành viên vào nhóm</h3>
                <div className="add_member-form">
                    <h4 className="add_member-sub_title">Tên nhóm</h4>
                    <div className="add_member-list-wrap">
                        {seclected} 
                        {/* {
                            groupList ?
                            (
                                <ul className="add_member-list">
                                </ul>
                            )
                            : null
                        } */}

                        <BiSolidDownArrow className="add_member-list-icon"/>
                    </div>
                </div>
            </div>
        </div>    
    )
}