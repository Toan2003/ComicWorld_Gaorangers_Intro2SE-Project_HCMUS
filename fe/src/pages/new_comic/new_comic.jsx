import './style.css';
import Popup from 'reactjs-popup';

import { Link, Outlet,useNavigate} from 'react-router-dom'
import {FaUpload } from "react-icons/fa"
import React,{useState, useRef} from "react"
import {postCreateComic} from "../../api/comic"
import { underline } from '@cloudinary/url-gen/qualifiers/textDecoration';
import {convertBase64} from '../../api/convertImage'
import { BsImage } from "react-icons/bs";
function NewComic() {
  const [TypesList, SetTypeList] = useState([
    'Lãng mạng',
    'Hài hước',
    'Hành động'
  ]);
  const [selects_Type, setSelects_Type] = useState()
  const [StateList, SetStateList] = useState([
    'Đang tiến hành',
    'Hoàn thành',
    'Tạm ngưng'
  ]);
  const [Select_state, set_Selects_state] = useState()
  const [input, setInput] = useState()
  const [Name, setName] = useState("")
  const [Author, setAuthor] = useState("")
  const [In_Progress, setIProg] = useState(true);
  var state_comic = "";
  const [Complete, setComplete] = useState(true);
  const [Drop, setDrop] = useState(true);
  const [Description, setDescription] = useState("") //description
  
  const[Date,setDate]=useState()
  const navigate = useNavigate();
  const handleChange_Description = (event) => {
    setDescription(event.target.value);
  }
  const handleResize_Description = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `200px`;
  }
  const navigate_to = (path) => {
    navigate(path);
  }
  const navigate_to_home = (e) => {
    navigate('/');
  }
  const [file, setFile] = useState();
  const inputRef = useRef(null);
  const SendData = async(event) => //Hàm button ở đây đã lấy đủ dữ liệu
  {
    // console.log(Name)
    // console.log(Author)
    // console.log(selects_Type)
    // console.log(Date)
    // console.log(Select_state)
    // console.log(file)
    const id = localStorage.getItem('id')
    if(Name==""||Author==""||selects_Type==""||Date==null||Select_state==""||file==null){
        alert("Thông tin trống vui lòng nhập lại!")
    }
    else
    {
        let f = await convertBase64(file[0])
        let result = await postCreateComic(Name,Date,Author, id,selects_Type,Select_state,f)
        // console.log(result.data.data.isSuccess)
        if (!result.data.isSuccess) {
          alert("Thông tin sai vui lòng nhập lại!")
        }
        else
        {
          alert("Upload thành công!")
          navigate_to('/');
        }
    }
  }
    const handleFileChange = (e) => {
        setFile(e.target.files);
    };

    const handleUploadClick = () => {
        inputRef.current?.click();
    };

  return (

    <div className="new_comic">
      <div className="Contrucst"> </div>
      <div className='center'>
        <ul className="link_newcomic">
          <li>
            <Link className='link_newcomic-item' to='/'>Trang chủ</Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link_newcomic-item' to='/comic'>Truyện</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
            <Link className='link_newcomic-item' to={`profile/upload`}> Tạo Truyện</Link>
          </li>
          <Outlet />
        </ul>
        <div className='Information'>
          <div className='Newcomics'>Tạo truyện</div>
        </div>
        <div className='Status'>Tên truyện</div>
      <input type="text" className="Nameinput" value={Name} onChange={(e)=>setName(e.target.value)}/>
      <div className='Status'>Tác giả</div>
      <input type="text" className="Authorinput" value={Author} onChange={(e)=>setAuthor(e.target.value)}/>
      <div className='Status'>Thể Loại</div>
      <select className="Select-1" value ={selects_Type} onChange={(e)=>setSelects_Type(e.target.value)}>
          <option></option>
          {TypesList.map((Type, index) => (
            <option >{Type}</option>
          ))}
        </select>
        <div className='Date'>Ngày</div>
        <div className="Date_box">
          <input type='Date' className='Dateinput' value={Date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='Status'> Tình trạng</div>
        <select className="Select-1" value={Select_state} onChange={(e) => set_Selects_state(e.target.value)}>
          {StateList.map((State, index) => (
            <option >{State}</option>
          ))}
        </select>
        <div className='Status'> Bìa truyện</div>
        <div>
      <div className="upload_chapter-upload">
                    <h3 className="upload_chapter-sub-title">File truyện</h3>    
                    <span className="upload_chapter-upload-wrap">
                        <input 
                            onChange={(e) => handleFileChange(e)} 
                            type='file' 
                            className="upload_chapter-file_input" 
                            accept="image/*" 
                            ref={inputRef}
                        />

                        {
                            file ?
                            (
                                <>
                                    <div className="upload_chapter-file-box">
                                        {
                                            Object.keys(file).map((obj, i) => 
                                            <div className="upload_chapter-file" key={i}>
                                                <p className="upload_chapter-file-text">{file[obj].name}</p>
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
      </div >
      <div className="Button_group">
            <button className='Button_accept' onClick={SendData} >Save</button>
            <button className='Button_accept' onClick={navigate_to_home}>Cancel</button>
      </div>
      </div>
    </div>
  );
}

export default NewComic;
