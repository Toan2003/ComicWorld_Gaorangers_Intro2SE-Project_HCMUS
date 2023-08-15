import './type_comic.css'
import { Link } from 'react-router-dom'

export default function TypeComic() {
  return (
    <div className="type-container">
      <div className="type-body">
        <h3 className="type-title">Thể Loại</h3>
        <div className="type-button-box">
          <TypeButton></TypeButton>
          <TypeButton></TypeButton>
          <TypeButton></TypeButton>
          <TypeButton></TypeButton>
          <TypeButton></TypeButton>
        </div>
      </div>
    </div>
  )
}

function TypeButton({ props }) {
  return (
    <div className="type-button-container">
      <Link className="type-button-link" to="">
        <h3 className="type-button-text">Manga</h3>
      </Link>
    </div>
  )
}