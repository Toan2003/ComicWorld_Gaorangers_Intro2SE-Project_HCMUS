import './upload_chapter.css'
import { BiSolidDownArrow } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import {useNavigate} from 'react-router-dom'
import { useState, useRef, useEffect} from 'react';
import { getReturnComicByUploader } from '../../api/comic';
import { postCreateChapter } from '../../api/chapter'
export default function UploadChapter() {
    const [fileList, setFileList] = useState(null);
    const inputRef = useRef(null);
    const [chapterName, setChapterName] = useState("");
    const [comicList, setComicList] = useState([]);
    const [seclected, setSeclected] = useState("Chọn tên truyện");
    const [seclectedId, setSeclectedId] = useState('');
    const id = localStorage.getItem('id');
    const [disabled, setDisabled] = useState(false);
    

    let inputHandler = (e) => {
        setChapterName(e.target.value);
    };

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };

    const handleUploadClick = () => {
        inputRef.current?.click();
    };

    const handleSeclectComic = (e) => {
        setSeclected(e.target.innerText);
        setSeclectedId(e.target.value);
    };
    const navigate = useNavigate();
    const Navigate_to_home=()=>
    {
        navigate('/')
    }
    const handleSubmit = async (e) => {
        setDisabled(true)
        if(id=="" || seclectedId=="" || fileList == null || fileList==[]||chapterName=="")
        {
            alert('Thông tin trống. Vui lòng nhập lại!')
            setDisabled(false)
        }
        let result = await postCreateChapter(id,seclectedId,fileList,chapterName)
        // console.log(result);
        if(result.data.isSuccess == true)
        {
            alert('Upload chapter thành công')
            Navigate_to_home()
            setDisabled(false)
        }
        else{
            alert('Thông tin không hợp lệ. Upload thất bại!')
            setDisabled(false)
        }
        // console.log(result);
    }

    async function loadDataPage() {
        const result = await getReturnComicByUploader(id)
        setComicList(result.data.data.listComic)
        // console.log(result)
    }

    useEffect(() => {
        loadDataPage()
    },[])
 
    // console.log(seclected);
    // console.log(chapterName);
    // console.log(fileList);

    return (
        <div className="upload_chapter-container">
            <div className="upload_chapter-body">
                <h2 className="upload_chapter-title">THÊM CHAPTER</h2>
                <h3 className="upload_chapter-sub-title">Tên truyện</h3>
                <div className="upload_chapter-list-wrap">
                    {seclected} 
                    {
                        comicList ?
                        (
                            <ul className="upload_chapter-list">
                            {
                            comicList.map((cur, index) => 
                            <option onClick={(e) => handleSeclectComic(e)} value={cur._id} className="upload_chapter-list_item" key={index}>{cur.nameComics}</option>)
                            }
                            </ul>
                        )
                        : null
                    }
                    
                    <BiSolidDownArrow className="upload_chapter-list-icon"/>
                </div>
                <h3 className="upload_chapter-sub-title">Tên chapter</h3>
                <input type="text" onChange={(e) => inputHandler(e)} className="upload_chapter-input" />

                <div className="upload_chapter-upload">
                    <h3 className="upload_chapter-sub-title">File truyện</h3>    
                    <span className="upload_chapter-upload-wrap">
                        <input 
                            onChange={(e) => handleFileChange(e)} 
                            type='file' 
                            className="upload_chapter-file_input" 
                            multiple 
                            accept="image/*" 
                            ref={inputRef}
                        />

                        {
                            fileList ?
                            (
                                <>
                                    <div className="upload_chapter-file-box">
                                        {
                                            Object.keys(fileList).map((obj, i) => 
                                            <div className="upload_chapter-file" key={i}>
                                                <p className="upload_chapter-file-text">{fileList[obj].name}</p>
                                            </div>)
                                        }
                                    </div>
                                    <button className='upload_chapter-button' onClick={handleUploadClick}>Chọn lại</button>
                                </>
                            )
                                :
                            (
                                <>
                                    <BsImage className="upload_chapter-upload-icon"/>
                                    <button className='upload_chapter-button' onClick={handleUploadClick}>Tải ảnh</button>
                                </>
                            )
                        }
                        
                    </span>
                </div>

                <div className="upload_chapter-button_section">
                    <button disabled={disabled} onClick={(e) =>handleSubmit(e)} className="upload_chapter-button">Lưu</button>
                    <button disabled={disabled} className="upload_chapter-button" onClick={Navigate_to_home}>Hủy</button>
                </div>
            </div>
        </div>  
    )

    // return (
    //     <div className="upload_chapter-container">
    //         <div className="upload_chapter-body">
    //             <CommentSection></CommentSection>

    //         </div>
    //     </div>
    // );
}