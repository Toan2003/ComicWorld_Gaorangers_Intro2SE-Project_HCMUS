import './style.css';
import { FaHome, FaListUl, FaChevronRight, FaChevronLeft, FaHeart } from "react-icons/fa"
import React, { useState } from "react"

export default function Comic() {
  const [selects, setSelects] = useState()
  const [input, setInput] = useState("")
  const [comicImages, setComicImages] = useState([
    './1',
    './2',
    './3',
    './4'
    // ...Thêm các hình ảnh truyện tranh khác vào đây HÌNH phải là đuôi jpg và xóa đuôi nó đi
  ]);
  const [value, setValue] = useState("") //description
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  }
  return (
    <div className="App">
      <div className="Background">
      </div>
      <div className="Logo_background">
      </div>
      <div className="Gray_after">
      </div>
      <div className="Contrucst">
      </div>
      <div className="Top_Navi_Bar">
        <button className="text-button1">Home</button> &gt;&gt;
        <button className="text-button1">Category</button> &gt;&gt;
        <button className="text-button1">Comic Name</button> &gt;&gt;
        <button className="text-button1">Chapter</button>
      </div>
      <div className="Title">
        Comic Name
      </div>
      <div className="Pass">&gt;&gt;</div>
      <div className="Chap">
        Chapter 0
      </div>
      <div className="Rectangle_move"></div>
      <div className="Text_instruct">Sử dụng mũi tên ( &lt;- ) hoặc (-&gt; ) để chuyển chapter ( ^.^ ) </div>
      <div className="icon_button">
        <button class="btnbtn-danger"><FaHome size={25} color='white' /></button> &nbsp;
        <button class="btnbtn-danger" ><FaListUl size={25} color='white' /></button> &nbsp;
        <button class="btnbtn-danger" ><FaChevronLeft size={25} color='white' /></button> &nbsp; &nbsp;
        <select value={selects} onChange={(e) => setSelects(e.target.value)}>
          <option>Chap 1</option>
          <option>Chap 2</option>
          <option>Chap 3</option>
          <option>Chap 4</option>
        </select>
        &nbsp; &nbsp;
        <button type="button" class="btnbtn-danger" ><FaChevronRight size={25} color='white' /></button> &nbsp;
        <button type="button" class="btnbtn-success" ><FaHeart size={25} color='white' /> Follow</button>
      </div>
      <div className="comic-page">
        {comicImages.map((image, index) => (

          <img key={index} src={require(image + '.jpg')} alt={`Comic Image ${index}`} />
        ))}
      </div>
      <div className="nav_end_chap">
        <button type="button" class="btnbtn-danger" ><FaChevronLeft size={25} color='white' /> Previous Chapter</button>&nbsp;&nbsp;
        <button type="button" class="btnbtn-danger" > Next Chapter <FaChevronRight size={25} color='white' /></button>
      </div>
      <div className="nav_end">
        <button type="button" className="text-button1">Home</button> &gt;&gt;
        <button type="button" className="text-button1">Category</button> &gt;&gt;
        <button type="button" className="text-button1">Comic Name</button> &gt;&gt;
        <button type="button" className="text-button1">Chapter</button>
      </div>
      <textarea value={value} onChange={handleChange} onInput={handleResize} className='commentbox' placeholder='Mời bạn thảo luận.... Vui lòng không spam,... để tránh bị khóa tài khoản' />
    </div>
  );
}
