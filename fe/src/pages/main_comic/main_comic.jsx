import { Link, Outlet } from 'react-router-dom'
import { getComic, getRankingBoard } from '../../api/comic'
import './styles.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Table } from '../../components/rankingBoard/rankingBoard'

export default function MainComic() {
  const { id } = useParams()
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState([])

  async function loadData() {
    const COMIC = await getComic(id, null)
    const RANK = await getRankingBoard()
    setComic(COMIC.data.data.comic)
    setRank(RANK.data.data.rankingList)
  }

  useEffect(() => {
    loadData()
  }, [rank])

  const content = 'Đang cập nhật'
  const comicName = comic?.nameComics
  const image = comic?.coverURL
  const author = comic?.Uploading?.group
  const status = comic?.status
  const type = comic?.type
  const view = comic?.view

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
              {
                comic?.chapters?.map((chapter) => {
                  return (
                    <div className='row'>
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