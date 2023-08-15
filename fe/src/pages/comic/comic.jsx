import './style.css';
import {FaHome,FaListUl,FaChevronRight,FaChevronLeft,FaHeart} from "react-icons/fa"
import React,{useState} from "react"



function Comic() {
  const NameComic="Comic Name"
  const Chapter=0;
  const [selects,setSelects]=useState()
  const [input,setInput]=useState("")
  const [comicImages, setComicImages] = useState([
    './1',
    './2',
    './3',
    './4'
    // ...Thêm các hình ảnh truyện tranh khác vào đây HÌNH phải là đuôi jpg và xóa đuôi nó đi
  ]);
  const AvatarImage='./avatar'
  const Username="abc123"
  const [value, setValue] = useState("") //description
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `250px`;
  }
  return (
    <div className="App">
      <div className="Logo_background">
      </div>
      <input type="text"  placeholder='Nhập từ khóa tìm kiếm...' value ={input} onChange={(e)=>setInput(e.target.value)} />
      < div className="Avatar">
        <img src={require(AvatarImage+'.jpg')} alt={"Avatar Image"}  class="rounded"/> 
      </div>
      <button className="Username"> {Username}</button>
      <div className="Gray_after">
      </div>
      <div className='Nav_menu'>
        <button className='Nav_button' ><FaHome/>Trang chủ</button>&nbsp;&nbsp;
        <button className='Nav_button' >Thể Loại</button>&nbsp;&nbsp;
        <button className='Nav_button'  >Trang chủ</button>
      </div>
      <div className="Contrucst">
      </div>
      <div className="Top_Navi_Bar">
      <button className="text-button1">Home</button> &gt;&gt;
      <button className="text-button1">Category</button> &gt;&gt;
      <button className="text-button1">Comic Name</button> &gt;&gt;
      <button className="text-button1">Chapter</button> 
      </div>
      <number className="Title"> {NameComic} </number> 
      <div className="Pass">&gt;&gt;</div>
      <button className="Chap"> Chapter {Chapter} </button>
        <div className="Rectangle_move"></div>
        <div className="Text_instruct">Sử dụng mũi tên ( &lt;- ) hoặc (-&gt; ) để chuyển chapter ( ^.^ ) </div>
        <div className="icon_button">
          <button class="btnbtn-danger"><FaHome size={25} color='white'/></button> &nbsp;
          <button class="btnbtn-danger" ><FaListUl size={25} color='white'/></button> &nbsp;
          <button class="btnbtn-danger" ><FaChevronLeft size={25} color='white'/></button> &nbsp; &nbsp;
          <select value ={selects} onChange={(e)=>setSelects(e.target.value)}> 
            <option>Chap 1</option>
            <option>Chap 2</option>
            <option>Chap 3</option>
            <option>Chap 4</option>
          </select>
          &nbsp; &nbsp;
          <button type="button" class="btnbtn-danger" ><FaChevronRight size={25} color='white'/></button> &nbsp;
          <button type="button" class="btnbtn-success" ><FaHeart size={25} color='white'/> Follow</button>
        </div>
        
        <div className="comic-page">
          {comicImages.map((image, index) => (
            
            <img key={index} src={require(image+'.jpg')} alt={`Comic Image ${index}`} />
          ))}
        </div>
        
        <div className="nav_end_chap">
        <button type="button" class="btnbtn-danger" ><FaChevronLeft size={25} color='white'/> Previous Chapter</button>&nbsp;&nbsp;
        <button type="button" class="btnbtn-danger" > Next Chapter <FaChevronRight size={25} color='white'/></button>
        </div>
        <div className="nav_end">
        <button type="button" className="text-button1">Home</button> &gt;&gt;
        <button type="button" className="text-button1">Category</button> &gt;&gt;
        <button type="button" className="text-button1">Comic Name</button> &gt;&gt;
        <button type="button" className="text-button1">Chapter</button> 
        </div>
        <textarea value={value} onChange={handleChange} onInput={handleResize} className='commentbox'placeholder='Mời bạn thảo luận.... Vui lòng không spam,... để tránh bị khóa tài khoản'/>
        <div className="Logo">COMICSWORLD</div>
        
      </div >
    
      
  );
}

export default Comic;
