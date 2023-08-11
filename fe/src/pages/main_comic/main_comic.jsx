import { Link, Outlet } from 'react-router-dom'
import './styles.css'

export default function mainComic() {
  const chapterOpen = false
  const comicName = 'VÕ LUYỆN ĐỈNH PHONG'
  const chapter = 123
  const image = 'https://st.nettruyenmax.com/data/comics/32/vo-luyen-dinh-phong.jpg'
  const author = '<NAME>'
  const status = '<STATUS>'
  const type = '<TYPE>'
  const view = 4000
  const content = 'Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác, là cao xử bất thắng hàn. Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất không buông tha, mới có thể có thể phá võ chi cực đạo. Lăng Tiêu các thí luyện đệ tử kiêm quét rác gã sai vặt Dương Khai ngẫu lấy được một bản vô tự hắc thư, từ nay về sau đạp vào dài đằng đẵng võ đạo.'
  // const numberChapters = 1000
  return (
    <div className="main-comic">
      <div className="center">
        <ul className="link">
          <li>
            <Link className='link-item' to='/'><p>Trang chủ</p></Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link-item' to='/comic'><p>Truyện</p></Link>
          </li>
          <li><p>{'>>'}</p></li>
          <li>
            <Link className='link-item' to='/comic/main-comic'><p>{comicName}</p></Link>
          </li>
          <Outlet />
          {chapterOpen ? <li>{chapter}</li> : <></>}
        </ul>
        <div className='title'>
          <div className='title-name'>
            <h2>{comicName}</h2>
          </div>
          <div className='title-center'>
            <div className='title-image'>
              <img src={image} alt="" />
            </div>
            <div className='title-information'>
              <div className='list-infor'>
                <div className='row'>
                  <p className='col'>Tác giả</p>
                  <p className='col'>{author}</p>
                </div>
                <div className='row'>
                  <p className='col'>Tình trạng</p>
                  <p className='col'>{status}</p>
                </div>
                <div className='row'>
                  <p className='col'>Thể loại</p>
                  <p className='col'>{type}</p>
                </div>
                <div className='row'>
                  <p className='col'>Lượt xem</p>
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
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
              <div className='row'>
                <div className='col'>Chapter 1</div>
                <div className='col'>1 ngày trước</div>
                <div className="col">N/A</div>
              </div>
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