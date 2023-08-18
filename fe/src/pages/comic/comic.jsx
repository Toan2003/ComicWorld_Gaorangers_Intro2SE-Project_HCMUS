import './style.css';
import { Link, Outlet } from 'react-router-dom'
import { FaHome, FaListUl, FaChevronRight, FaChevronLeft, FaHeart, FaChevronDown, FaRegWindowClose } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { getChapter } from '../../api/chapter'
import { getComic, postAddFollowComic, postUnfollowComic } from '../../api/comic'
import { useParams } from 'react-router-dom'

function Comic() {
  const { idComic, idChapter } = useParams()

  const [chapter, setOneChapter] = useState([])
  const [comic, setComic] = useState([])
  const [follow, setFollow] = useState([])

  // const [allChapter, setAllChapter] = useState([])
  
  const userId = localStorage.getItem('id')

  async function loadData() {
    // const comic = await getAllChapterOfComic(idComic, null)
    const chapters = await getChapter(idChapter, null)
    const comics = await getComic(idComic, null)
    // setOneChapter(chapters.data.data)
    setOneChapter(chapters.data.data)
    setComic(comics.data.data.comic)
    setFollow(comics.data.data.isFollowed)
  }

  async function handleFollow() {
    if (follow) {
      let result = await postUnfollowComic(userId , idComic)
      console.log(result)
      
      if (result.data.isSuccess) {
        setFollow(false)
        console.assert('Bạn đã theo dõi truyện này')
      }

    }
    else {
      let result = await postAddFollowComic(userId, idComic)
      console.log(result)
      if (result.data.isSuccess) {
        setFollow(true)
        console.assert('Bạn đã bỏ theo dõi truyện này')
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const NameComic = comic?.nameComics
  const CurChapter = chapter?.chapterName
  
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
  // const AvatarImage = './avatar'
  // const Username = "abc123"
  const [comment, setComment] = useState("")
  const handleChange = (event) => {
    setComment(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `90px`;
  }
  return (
    <div className="comic">
      <div className="Contrucst">
      </div>
      <div className="center">
        <ul className="link_comic">
          <li>
            <Link className='link_comic-item' to='/'>Trang chủ</Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to='/type-comic'>Thể Loại</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to={`/comic/main-comic/${idComic}`}>{NameComic}</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to={`/comic/main-comic/${idComic}/${idChapter}`}>{NameComic}</Link>
          </li>
          <Outlet />
        </ul>

        <ul className='title_link'>
          <li>
            <h3><Link className='title_link-item' to={`/comic/main-comic/${idComic}`}>{NameComic}</Link> </h3>
          </li>
          <li className="pass"><div className='pass'>{'>>'}</div></li>
          <li>
            <h3><Link className='title_link-item' to={`/comic/main-comic/${idComic}/${idChapter}`}>{CurChapter}</Link> </h3>
          </li>
        </ul>

        <div className='Instruct'>
          <div className='Rectangle_move'>
            <div className='text_ins'>Sử dụng mũi tên ( {'<'}- ) hoặc (-{'>'} ) để chuyển chapter ( ^.^ )</div>
          </div>
        </div>
        <div className="icon_button">

          <button className='btn btn-danger'><FaHome size={25} color='white' /></button> &nbsp;
          <button className='btn btn-danger' ><FaListUl size={25} color='white' /></button> &nbsp;
          <button className='btn btn-danger' ><FaChevronLeft size={25} color='white' /></button> &nbsp; &nbsp;
          <Popup
            modal
            trigger={<button className="btn btn-outline-secondary"> {CurChapter} <FaChevronDown size={15} /></button>}
            contentStyle={{
              width: '590px'
              , height: '590px', overflow: 'scroll', background: '#ebebeb'
            }}
          >
            {close => (
              <div className='PA'>
                <div className='Close_Popup'>
                  <button className="CloseWin"
                    onClick={() => {
                      console.log('modal closed ');
                      close();
                    }} > <FaRegWindowClose size={35} />  </button>
                </div>
                <div className='SearchChap_Popup'>
                  <input type="text" className="SearchChapBar_Popup" placeholder='Nhập số chap...'></input>
                </div>

                <div className='Body_Modal'>
                  <div className='Chap_Pos'>
                    {ComicsChapter.map((chapter, index) => (
                      <button className='Chap_but'>{chapter}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Popup>  &nbsp; &nbsp;
          <button type="button" className='btn btn-danger' ><FaChevronRight size={25} color='white' /></button> &nbsp;
          <button onClick={() => handleFollow()} type="button" className='btn btn-success' ><FaHeart size={25} color='white' /> Theo dõi</button>
        </div>
        <div className="comic-page">
          {chapter?.chapterImageID?.map((image, idx) => (
            <img key={idx} src={image} />
          ))}
        </div>
        <div className="nav_end_chap">
          <button type="button" className="btn btn-danger" ><FaChevronLeft size={25} color='white' /> Chap sau</button>&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" > Chap trước <FaChevronRight size={23} color='white' /></button>
        </div>
        <ul className="link_comic">
          <li>
            <Link className='link_comic-item' to='/'>Trang chủ</Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to='/type-comic'>Thể Loại</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to={`/comic/main-comic/${idComic}`}>{NameComic}</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to={`/comic/main-comic/${idComic}/${idChapter}`}>{NameComic}</Link>
          </li>
          <Outlet />
        </ul>

        <div className="CommentSection">
          <textarea value={comment} onChange={handleChange} onInput={handleResize} className='commentbox' placeholder='Mời bạn thảo luận.... Vui lòng không spam,... để tránh bị khóa tài khoản' />
        </div>
      </div>
    </div >

  );
}

export default Comic;
