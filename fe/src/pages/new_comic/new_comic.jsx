import './style.css';
import { Link, Outlet } from 'react-router-dom'
import {FaHome} from "react-icons/fa"
import React,{useState} from "react"
function NewComic() {
  const AvatarImage='./avatar'
  const Username="tkl"
  const [input,setInput]=useState()
  const [selects,setSelects]=useState()
  const[Name,setName]=useState("")
  const[Author,setAuthor]=useState("")
  const[In_Progress, setIProg]=useState(true);
  const[Complete, setComplete]=useState(true);
  const[Drop, setDrop]=useState(true);
  const [value, setValue] = useState("") //description
  const[file,setFiles]= useState()
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `3000px`;
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
      <div className='Newcomics'>Truyện mới</div>
        </div>
        <div className='Status'>Tên truyện</div>
      <input type="text" className="Nameinput" value={Name} onChange={(e)=>setName(e.target.value)}/>
      <div className='Status'>Tác giả</div>
      <input type="text" className="Authorinput" value={Author} onChange={(e)=>setAuthor(e.target.value)}/>
      <div className='Status'>Thể Loại</div>
      <select value ={selects} onChange={(e)=>setSelects(e.target.value)}> 
              <option>Hành động</option>
              <option>Hài hước</option>
              <option>Lãng mạng</option>
      </select>
      <div className='Date'>Ngày</div>
      <div className="Date_box">
      <input type='Date' className='Dateinput'/>
      </div>
      <div className='Status'> Tình trạng</div>
      
      <div className="Box_Place">
        <div className='Box'>
      <input  className="checkbox1" type='checkbox' value={In_Progress} /> Đang tiến triển
      </div>
      <div className='Box'>
      <input className="checkbox2" type='checkbox' value={Complete} /> Hoàn thành
      </div>
      <div className='Box'>
      <input className="checkbox3" type='checkbox' value={Drop} /> Bỏ dở
      </div>
      </div>
      <div className='Status'> Mô tả</div>
      <textarea value={value} onChange={handleChange} onInput={handleResize} className='commentbox'/>
      <div className='Status'> Bìa truyện</div>
      <input className='Input_file' type='file' value ={file} onChange={(e)=>setFiles(e.target.value)}/>
      <div class="Button_group">
            <button className='Button_accept'>Save</button>
            <button className='Button_accept'>Cancel</button>
      </div>
    </div>
    </div>
  );
}

export default NewComic;
