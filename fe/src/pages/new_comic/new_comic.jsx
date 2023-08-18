import './style.css';
import Popup from 'reactjs-popup';

import { Link, Outlet,useNavigate} from 'react-router-dom'
import { FaHome, FaListUl, FaChevronRight, FaChevronLeft, FaHeart, FaChevronDown, FaRegWindowClose } from "react-icons/fa"
import React,{useState} from "react"
import {postCreateComic} from "../../api/comic"
import { underline } from '@cloudinary/url-gen/qualifiers/textDecoration';
import {convertBase64} from '../../api/convertImage'
function NewComic() {
  const [TypesList, SetTypeList] = useState([
    'Lãng mạng',
    'Hài hước',
    'Hành động'
  ]);
  const [selects_Type,setSelects_Type]=useState()
  const [StateList, SetStateList] = useState([
    'Đang tiến hành',
    'Hoàn thành',
    'Tạm ngưng'
  ]);
  const [Select_state,set_Selects_state]=useState()
  const [input,setInput]=useState()
  const[Name,setName]=useState("")
  const[Author,setAuthor]=useState("")
  const[In_Progress, setIProg]=useState(true);
  var state_comic="";
  const[Complete, setComplete]=useState(true);
  const[Drop, setDrop]=useState(true);
  const [Description, setDescription] = useState("") //description
  const[file,setFiles]= useState()
  const[Date,setDate]=useState()
  const navigate = useNavigate();
  const handleChange_Description= (event) => {
    setDescription(event.target.value);
  }
  const handleResize_Description= (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `200px`;
  }
  const navigate_to=(path)=>
  {
    navigate(path);
  }
  const navigate_to_home=(e)=>
  {
    navigate('/');
  }
  const SendData = async(event) => //Hàm button ở đây đã lấy đủ dữ liệu
  {
    // console.log(Name)
    // console.log(Author)
    // console.log(selects_Type)
    // console.log(Date)
    // console.log(Select_state)
    // console.log(file)
    const id = localStorage.getItem('id')
    if(Name==""||Author==""||selects_Type==""||Date==null||Select_state==""
    ||file==null){
      alert("Thông tin trống vui lòng nhập lại!")
    }
    let f = await convertBase64(file[0])
    // console.log(f)
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
      <select value ={selects_Type} onChange={(e)=>setSelects_Type(e.target.value)}>
        <option></option>
          {TypesList.map((Type, index) => (
                        <option >{Type}</option>
                      ))}
      </select>
      <div className='Date'>Ngày</div>
      <div className="Date_box">
      <input type='Date' className='Dateinput' value={Date} onChange={(e)=>setDate(e.target.value)}/>
      </div>
      <div className='Status'> Tình trạng</div>
       <select value ={Select_state} onChange={(e)=>set_Selects_state(e.target.value)}>
       <option></option>
       {StateList.map((State, index) => (
                        <option >{State}</option>
                      ))}
      </select> 
      <div className='Status'> Bìa truyện</div>
      <input className='Input_file' type='file' onChange={(e)=>setFiles(e.target.files)}/>
      <div class="Button_group">
            <button className='Button_accept' onClick={SendData} >Save</button>
            <button className='Button_accept' onClick={navigate_to_home}>Cancel</button>
      </div>
    </div>
    </div>
  );
}

export default NewComic;
