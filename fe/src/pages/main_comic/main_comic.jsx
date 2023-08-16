import { Link, Outlet } from 'react-router-dom'
import { getComic } from '../../api/comic'
import './styles.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MainComic() {
  const { id } = useParams()
  const [comic, setComic] = useState([])

  async function loadData() {
    console.log(typeof(id))
    const result = await getComic(id, null)
    console.log(result.data)
    setComic(result.data.data.comic)
  }

  useEffect(() => {
    loadData()
  }, [])

  const chapterOpen = false
  const content = 'Đang cập nhật'
  const comicName = comic?.nameComics
  const image = comic?.coverURL
  const author = comic?.Uploading?.group
  const status = comic?.status
  const type = comic?.type
  const view = 4000

  // useEffect(() => {
  //   // console.log(comic.chapters)

  // }, [comic])

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
            <Link className='link-item' to='/comic/main-comic'>{comicName}</Link>
          </li>
          <Outlet />
        </ul>
        <div className='title'>
          <h2 className='title-name'>{comicName}</h2>
          <div className='title-center'>
            <div className='title-image'>
              <img src={image} alt="" />
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
                <button type='button' className='btn btn-success'>Theo dõi</button>
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
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              {
                
              }
            </div>
          </div>
        </div>
      </div>
      <div className="rank">
        <h4>BẢNG XẾP HẠNG</h4>
        <ul>
          <li>
            <p>Tên truyện</p>
            <p>Số chapter</p>
          </li>
          <li>
            <p>Tên truyện</p>
            <p>Số chapter</p>
          </li>
          <li>
            <p>Tên truyện</p>
            <p>Số chapter</p>
          </li>
          <li>
            <p>Tên truyện</p>
            <p>Số chapter</p>
          </li>
          <li>
            <p>Tên truyện</p>
            <p>Số chapter</p>
          </li>
        </ul>
      </div>
    </div>
  );
}