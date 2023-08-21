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
  const [follow, setFollow] = useState(false)

  // const [allChapter, setAllChapter] = useState([])
  
  const userId = localStorage.getItem('id')
  const [NextChapter, setNextChapter] = useState('')
  const [PreviousChapter, setPreviousChapter] = useState('')
  async function loadData() {
    // const comic = await getAllChapterOfComic(idComic, null)
    const chapters = await getChapter(idChapter, null)
    const comics = await getComic(idComic, userId)
    // setOneChapter(chapters.data.data)
    setOneChapter(chapters.data.data)
    setComic(comics.data.data.comic)
    setFollow(comics.data.data.isFollowed)

    // console.log(comics.data.data.isFollowed)
  }

  async function handleFollow() {
    if (follow) {
      let result = await postUnfollowComic(userId , idComic)
      console.log(result)
      
      if (result.data.isSuccess) {
        setFollow(false)
      }

    }
    else {
      let result = await postAddFollowComic(userId, idComic)
      console.log(result)
      if (result.data.isSuccess) {
        setFollow(true)
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [idChapter])
  useEffect(()=>{
    if (comic?.chapters?.length > 0) {
      for (let i=0; i<=comic.chapters.length-1;i++)
      {
        if(idChapter ==comic.chapters[i].chaptersID)
        {
          // console.log(comic.chapters[i].chaptersID)
          // console.log(i)
          if(i+1< comic.chapters.length) {
            setNextChapter(comic.chapters[i+1].chaptersID)
          }
          else {
            setNextChapter(idChapter)
          }
          if(i-1>=0){
            setPreviousChapter(comic.chapters[i-1].chaptersID)
          } else {
            setPreviousChapter(idChapter)
          }
        }
      }
    }
  },[comic])

  // useEffect(()=>{console.log(NextChapter)},[NextChapter])
  // useEffect(()=>{console.log(PreviousChapter)},[PreviousChapter])
  const NameComic = comic?.nameComics
  const CurChapter = chapter?.chapterName
  // const CurIdChapter=chapter?.chaptersID

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
  const[searchInput,setSearchInput]= useState("")
  const [comment, setComment] = useState("")
  const handleChange = (event) => {
    setComment(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `90px`;
  }
  const navigate_to=(path)=>
  {
    window.location.href = path;
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
            <Link className='link_comic-item' to={`/type-comic/main-comic/${idComic}`}>{NameComic}</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
            <Link className='link_comic-item' to={`/type-comic/main-comic/${idComic}/${idChapter}`}>{CurChapter}</Link>
          </li>
          <Outlet />
        </ul>

        <ul className='title_link'>
          <li>
            <h3><Link className='title_link-item' to={`/type-comic/main-comic/${idComic}`}>{NameComic}</Link> </h3>
          </li>
          <li className="pass"><div className='pass'>{'>>'}</div></li>
          <li>
            <h3><Link className='title_link-item' to={`/type-comic/main-comic/${idComic}/${idChapter}`}>{CurChapter}</Link> </h3>
          </li>
        </ul>

        <div className='Instruct'>
          <div className='Rectangle_move'>
            <div className='text_ins'>Sử dụng mũi tên ( {'<'}- ) hoặc (-{'>'} ) để chuyển chapter ( ^.^ )</div>
          </div>
        </div>
        <div className="icon_button">

          <Link className='btn btn-danger' to='/'><FaHome size={25} color='white' /></Link> &nbsp;
          <Link className='btn btn-danger' to={`/type-comic/main-comic/${idComic}`} ><FaListUl size={25} color='white' /></Link> &nbsp;
          <Link className='btn btn-danger' to={`/type-comic/main-comic/${idComic}/${PreviousChapter}`}><FaChevronLeft size={25} color='white' /></Link> &nbsp; &nbsp;
          <Popup
            modal
            trigger={<button className="btn btn-outline-secondary"> {CurChapter} <FaChevronDown size={15} /></button>}
            contentStyle={{
              width: '610px'
              , height: '550px', overflow: 'scroll', background: '#FFFFFF',
            }}
          >
            {close => (
              <div className='PA'>
                <div className='Close_Popup'>
                  <button className="CloseWin"
                    onClick={() => {
                      close();
                    }} > <FaRegWindowClose size={35} />  </button>
                </div>
                <div className='Line_Pos'>
                <hr className='Line_Hor'/>
                </div>

                <div className='Body_Modal'>
                  <div className='Chap_Pos'>
                      {comic?.chapters?.map((chapter, index) => (
                      <button className='Chap_but' 
                      id={chapter?.chaptersID} 
                       onClick={() => {
                        navigate_to(`/type-comic/main-comic/${idComic}/${chapter?.chaptersID}`)
                        close();
                      }}>
                        {chapter.chaptersName}
                      </button>
                    ))}
                    
                  </div>
                </div>
              </div>
            )}
          </Popup>  &nbsp; &nbsp;
          <Link type="button" className='btn btn-danger' to={`/type-comic/main-comic/${idComic}/${NextChapter}`} ><FaChevronRight size={25} color='white' /></Link> &nbsp;
          {
            follow ?
            (
              <button onClick={() => handleFollow()} type="button" className='btn btn-success' > Bỏ theo dõi</button>
            )
            :
            (
              <button onClick={() => handleFollow()} type="button" className='btn btn-success' ><FaHeart size={25} color='white' /> Theo dõi</button>
            )
          }
        </div>
        <div className="comic-page">
          {chapter?.chapterImageID?.map((image, idx) => (
            <img key={idx} src={image} />
          ))}
        </div>
        <div className="nav_end_chap">
          <Link type="button" className="btn btn-danger" to={`/type-comic/main-comic/${idComic}/${PreviousChapter}`} ><FaChevronLeft size={25} color='white' /> Chap sau</Link>&nbsp;&nbsp;
          <Link type="button" className="btn btn-danger" to={`/type-comic/main-comic/${idComic}/${NextChapter}`}> Chap trước <FaChevronRight size={23} color='white' /></Link>
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
            <Link className='link_comic-item' to={`/type-comic/main-comic/${idComic}`}>{NameComic}</Link>
          </li>
          <li ><p >{'>>'}</p></li>
          <li>
          <Link className='link_comic-item' to={`/type-comic/main-comic/${idComic}/${idChapter}`}>{CurChapter}</Link>
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
