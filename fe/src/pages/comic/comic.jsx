import './style.css';
import { FaHome, FaListUl, FaChevronRight, FaChevronLeft, FaHeart, FaChevronDown, FaRegWindowClose } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { getChapter, getAllChapterOfComic } from '../../api/chapter'
import { useParams } from 'react-router-dom'

function Comic() {
  const { idComic, idChapter } = useParams()

  const [chapter, setOneChapter] = useState([])
  // const [allChapter, setAllChapter] = useState([])
   
  async function loadData() {
    // const comic = await getAllChapterOfComic(idComic, null)
    const chapters = await getChapter(idChapter, null)
    setOneChapter(chapters.data.data)
    // setAllChapter(comic.data.data.)
  }
  

  useEffect(() => {
    loadData()  
  }, [])

  const NameComic = chapter.chapterName
  const CurChapter = chapter.chapterName;
  const [ComicsChapter, setChapter] = useState([
    'Chap 1',
    'Chap 2',
    'Chap 3',
    'Chap 4',
    'Chap 5',
    'Chap 6',
    'Chap 7',
    'Chap 8',
  ]);
  // const [input, setInput] = useState("")
  // const [comicImages, setComicImages] = useState([
  //   './1',
  //   './2',
  //   './3',
  //   './4'
  //   // ...Thêm các hình ảnh truyện tranh khác vào đây HÌNH phải là đuôi jpg và xóa đuôi nó đi
  // ]);
  const AvatarImage = './avatar'
  const Username = "abc123"
  const [comment, setComment] = useState("")
  const handleChange = (event) => {
    setComment(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `90px`;
  }
  return (
    <div className="App">
      <div className="Contrucst">
      </div>
      <div className="Top_Navi_Bar">
        <button className="text-button1">Home</button> &gt;&gt;
        <button className="text-button1">Category</button> &gt;&gt;
        <button className="text-button1">Comic Name</button> &gt;&gt;
        <button className="text-button1">Chapter</button>
        <button className="text-button1">Home</button> &gt;&gt;
        <button className="text-button1">Category</button> &gt;&gt;
        <button className="text-button1">Comic Name</button> &gt;&gt;
        <button className="text-button1">Chapter</button>
      </div>
      <div className='Titlepos'>
        <button className="Title"> {NameComic}</button>
        <div className="Pass"> &nbsp; &nbsp; &gt;&gt; &nbsp; &nbsp;</div>
        <button className="Chap"> {CurChapter} </button>
      </div>
      <div className="Rectangle_move"></div>
      <div className="Text_instruct">Sử dụng mũi tên ( &lt;- ) hoặc (-&gt; ) để chuyển chapter ( ^.^ ) </div>
      <div className="icon_button">

        <button class="btnbtn-danger"><FaHome size={25} color='white' /></button> &nbsp;
        <button class="btnbtn-danger" ><FaListUl size={25} color='white' /></button> &nbsp;
        <button class="btnbtn-danger" ><FaChevronLeft size={25} color='white' /></button> &nbsp; &nbsp;
        <Popup
          modal
          trigger={<button className="Choose_Chap"> {CurChapter} <FaChevronDown size={15} /></button>}
          contentStyle={{
            width: '637px'
            , height: '631px', overflow: 'scroll', background: '#ebebeb'
          }} 
        >
          
          <button className="CloseWin"  > <FaRegWindowClose size={35} /> <popupClose/></button>

          <input type="text" className="SearchChapBar" placeholder='Nhập số chap...'></input>
          <div className='Body_Modal'>
            <div className='Chap_Pos'>
              {ComicsChapter.map((chapter, index) => (
                <button className='Chap_but'>{chapter}</button>
              ))}
            </div>
          </div>
        </Popup>
        &nbsp; &nbsp;
        <button type="button" class="btnbtn-danger" ><FaChevronRight size={25} color='white' /></button> &nbsp;
        <button type="button" class="btnbtn-success" ><FaHeart size={25} color='white' /> Follow</button>
      </div>

      <div className="comic-page">
        {chapter?.chapterImageID?.map((image) => (

          <img src={image} />
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
      <textarea value={comment} onChange={handleChange} onInput={handleResize} className='commentbox' placeholder='Mời bạn thảo luận.... Vui lòng không spam,... để tránh bị khóa tài khoản' />

    </div >


  );
}

export default Comic;
