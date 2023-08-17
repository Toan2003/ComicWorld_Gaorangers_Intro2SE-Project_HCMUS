import './upload_chapter.css'
import { BiSolidDownArrow } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { useState } from 'react';

export default function UploadChapter() {
    const [fileList, setFileList] = useState(null);

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };
    console.log(fileList);

    return (
        <div className="upload_chapter-container">
            <div className="upload_chapter-body">
                <h2 className="upload_chapter-title">THÊM CHAPTER</h2>
                <h3 className="upload_chapter-sub-title">Tên truyện</h3>
                <ul className="upload_chapter-list">Chọn tên truyện <BiSolidDownArrow className="upload_chapter-list-icon"/></ul>
                <h3 className="upload_chapter-sub-title">Tên chapter</h3>
                <input type="text" className="upload_chapter-input" />

                <div className="upload_chapter-upload">
                    <h3 className="upload_chapter-sub-title">File truyện</h3>    
                    <span className="upload_chapter-upload-wrap">
                        <BsImage className="upload_chapter-upload-icon"/>
                        <input onChange={(e) => setFileList(e.target.files)} name="Chọn ảnh" type='file' className="upload_chapter-file_input" multiple/>
                    </span>
                </div>

                <div className="upload_chapter-button_section">
                    <button className="upload_chapter-button">Lưu</button>
                    <button className="upload_chapter-button">Hủy</button>
                </div>
            </div>
        </div>  
    )
}