import { Link, Outlet } from 'react-router-dom'
import { getComic, getRankingBoard, postAddFollowComic, postUnfollowComic } from '../../api/comic'
import { getAllChapterOfComic } from '../../api/chapter'
import './styles.css'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Table } from '../../components/rankingBoard/rankingBoard'
import { AiFillStar } from 'react-icons/ai'
import { postRating, isRating } from '../../api/comic'
import { AuthContext } from '../../context/context'
import { CommentSection } from '../../components/comment/comment'

export default function MainComic() {
  const { id } = useParams() //cai nay la id comic
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState([])
  const [follow, setFollow] = useState([])
  const [chapters, setChapters] = useState([])
  const [allChapters, setAllChapters] = useState([])

  const userId = localStorage.getItem('id')
  const [isRated, setIsRated] = useState(-1)
  const {authenticated} = useContext(AuthContext)
  
  const [firstChapter, setFistChapter] = useState('')
  const [lastChapter, setLastChapter] = useState('')

  // console.log(allChapters)
  async function loadData() {
    const ISRATING = await isRating(id, userId)
    // console.log(ISRATING)
    const COMIC = await getComic(id, userId)
    const RANK = await getRankingBoard()
    const allChapter = await getAllChapterOfComic(id) // cai nay la id comic
    // console.log(allChapter)
    // console.log(allChapter)
    if (COMIC.data.data.comic.chapters.length > 0) {
      if (COMIC.data.data.comic.chapters[0].chaptersID) {
        setFistChapter(COMIC.data.data.comic.chapters[0].chaptersID)
      }
      if (COMIC.data.data.comic.chapters[COMIC.data.data.comic.chapters.length-1].chaptersID) {
        setLastChapter(COMIC.data.data.comic.chapters[COMIC.data.data.comic.chapters.length-1].chaptersID)
      }
    }

    setComic(COMIC.data.data.comic)
    setRank(RANK.data.data.rankingList)
    setFollow(COMIC.data.data.isFollowed)
    setChapters(COMIC.data.data.comic.chapters)
    setAllChapters(allChapter.data.data.listChapters)
    
    setIsRated(ISRATING.data.data.star)

    // console.log(ISRATING.data)
    // console.log(firstChapter)
    // console.log(lastChapter)
    // console.log("id ne:", id)
  }
  
  async function handleFollow() {
    if (follow) {
      let result = await postUnfollowComic(userId , id)
      // console.log(result)
      
      if (result.data.isSuccess) {
        setFollow(false)
      }

    }
    else {
      let result = await postAddFollowComic(userId, id)
      // console.log(result)
      if (result.data.isSuccess) {
        setFollow(true)
      }
    }
  }

  async function handleClickRating(number) {
    //gọi api  gửi number(số sao người dùng chọn)
    postRating(userId, id, number)
    setIsRated(number)
  }

  useEffect(() => {
    loadData()
  }, [isRated, id])

  const content = 'Đang cập nhật'
  const comicName = comic?.nameComics
  const image = comic?.coverURL
  const author = comic?.Uploading?.group
  const status = comic?.status
  const type = comic?.type
  const view = comic?.view
  const rating = comic?.ratingAvg
  
  // console.log(comic)
  // console.log(isRated)

  
  return (
    <div className="main-comic-container">
      <div className="main-comic">
        <div className="center">
          <ul className="link">
            <li>
              <Link className='link-item' to='/'>Trang chủ</Link>
            </li>
            <li><p>{'>>'}</p></li>
            <li>
              <Link className='link-item' to='/type-comic'>Thể loại</Link>
            </li>
            <li><p>{'>>'}</p></li>
            <li>
              <Link className='link-item' to={`/type-comic/main-comic/${id}`}>{comicName}</Link>
            </li>
            <Outlet />
          </ul>
          <div className='title'>
            <h2 className='title-name'>{comicName}</h2>
            <div className='title-center'>
              <div className='title-image'>
                <img src={image} alt="" className='tital-image-cover-url'/>
              </div>
              <div className='title-information'>
                <div className='list-infor'>
                  <div className='row'>
                    <p className='col'>Tác giả: </p>
                    <p className='col'>{author}</p>
                  </div>
                  <div className='row'>
                    <p className='col'>Tình trạng: </p>
                    <p className='col'>{status}</p>
                  </div>
                  <div className='row'>
                    <p className='col'>Thể loại: </p>
                    <p className='col'>{type}</p>
                  </div>
                  <div className='row'>
                    <p className='col'>Lượt xem: </p>
                    <p className='col'>{view}</p>
                  </div>
                  <div className='row'>
                    <p className='col'>Đánh giá: </p>
                    <p className='col'>{rating}<AiFillStar className='star-icon'/></p>
                  </div>
                  { 
                     authenticated ? 
                    (isRated != -1 ?
                    (
                      <div className='user-rating'>
                        <p className='user-rating-title'>Đánh giá của bạn: {isRated}<AiFillStar className='star-icon'/></p>
                      </div>
                    )
                    :
                    (
                      <div className='row'>
                        <p className='col'>Gửi đánh giá: </p>
                          <div className="rating-section">
                            <AiFillStar onClick={() => handleClickRating(1)} className="rating-star"></AiFillStar>
                            <AiFillStar onClick={() => handleClickRating(2)} className="rating-star"></AiFillStar>
                            <AiFillStar onClick={() => handleClickRating(3)} className="rating-star"></AiFillStar>
                            <AiFillStar onClick={() => handleClickRating(4)} className="rating-star"></AiFillStar>
                            <AiFillStar onClick={() => handleClickRating(5)} className="rating-star"></AiFillStar>
                          </div>
                      </div>
                    ))
                    :
                    null
                  }
                </div>
                <div className='title-button'>
                  {
                    follow ?
                    (
                      <button type='button' onClick={() =>handleFollow()} className='btn btn-success'>Bỏ theo dõi</button>
                    )
                    :
                    <button type='button' onClick={() =>handleFollow()} className='btn btn-success'>Theo dõi</button>
                  }
                  <Link  className='btn btn-primary' id={firstChapter} to={`/type-comic/main-comic/${id}/${firstChapter}`}>Đọc từ đầu</Link>
                  <Link  className='btn btn-primary' id={lastChapter} to={`/type-comic/main-comic/${id}/${lastChapter}`}>Đọc mới nhất</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='content'>
            <h4>NỘI DUNG</h4>
            <div className='content-box'>
              <p>{content}</p>
            </div>
          </div>
          <div className='chapter'>
            <h4>DANH SÁCH CHƯƠNG</h4>
            <div className='list-chapter'>
              <div className='row'>
                <div className='col'><p>Số chương</p></div>
                <div className='col'><p>Cập nhật</p></div>
                <div className='col'><p>Xem</p></div>
              </div>
              <div className='list-chapter-content'>
                {
                  allChapters?.map((chapter, index) => {
                    return (
                      <div className='row' key={index}>
                        <Link className='col' id={chapter?._id} to={`/type-comic/main-comic/${id}/${chapter?._id}`}>{chapter?.chapterName}</Link> 
                        <div className='col'>{chapter?.dateCreate}</div>
                        <div className="col">{chapter?.view}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="rank">
          <Table name="Bảng Xếp Hạng" data={rank}></Table>
        </div>
      </div>
      <div className="main-comic-comment">
        <div className="main-comic-comment-wrapper">
          <CommentSection comic={comic} userId={userId} comicId={id}></CommentSection>
        </div>
      </div>
    </div>
  );
}