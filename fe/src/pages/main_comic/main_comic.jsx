import { Link, Outlet } from 'react-router-dom'
import { getComic, getRankingBoard, postAddFollowComic, postUnfollowComic } from '../../api/comic'
import './styles.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Table } from '../../components/rankingBoard/rankingBoard'

export default function MainComic() {
  const { id } = useParams()
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState([])
  const [follow, setFollow] = useState([])
  // const [userId, setUserId] = useState(null)
  // const userId = '64d8ed909e43edfe49b84fd9'
  const userId = localStorage.getItem('id')
  

  async function loadData() {
    // localStorage.getItem( 'id') != 'null' ? setUserId(localStorage.getItem('id')) : setUserId(null)
    // console.log(userId)
    // console.log(COMIC.data)
    const COMIC = await getComic(id, userId)
    const RANK = await getRankingBoard()
    setComic(COMIC.data.data.comic)
    setRank(RANK.data.data.rankingList)
    setFollow(COMIC.data.data.isFollowed)
  }
  // console.log(follow)


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



  useEffect(() => {
    loadData()
  }, [])

  const content = 'Đang cập nhật'
  const comicName = comic?.nameComics
  const image = comic?.coverURL
  const author = comic?.Uploading?.group
  const status = comic?.status
  const type = comic?.type
  const view = comic?.view

  // console.log(follow)

  return (
    <div className="main-comic">
      <div className="center">
        <ul className="link">
          <li>
            <Link className='link-item' to='/'>Trang chủ</Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link-item' to='/comic'>Truyện</Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link-item' to={`/comic/main-comic/${id}`}>{comicName}</Link>
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
                <button type='button' className='btn btn-primary'>Đọc từ đầu</button>
                <button type='button' className='btn btn-primary'>Đọc mới nhất</button>
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
                comic?.chapters?.map((chapter, index) => {
                  return (
                    <div className='row' key={index}>
                      <Link className='col' id={chapter?.chaptersID} to={`/type-comic/main-comic/${id}/${chapter?.chaptersID}`}>{chapter.chaptersName}</Link> 
                      <div className='col'>1 ngày trước</div>
                      <div className="col">N/A</div>
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
  );
}