import './type_comic.css'
import { Link } from 'react-router-dom'
import { ComicSection } from '../../components/comic/comic'
import { getComicAccordingToType } from "../../api/comic"

export default function TypeComic() {
  const bttnlist = [
    {
      text: 'manga'
    },
    {
      text:'manhwa'
    },
    {
      text: 'romance'
    },
    {
      text: 'horror'
    },
    {
      text: 'fiction'
    }
  ]

  let sectionTitle = undefined

  function handleTypeButtonClick(sectionTitle) {
    sectionTitle = ""
  }

  return (
    <div className="type-container">
      <div className="type-body">
        <h3 className="type-title">Thể Loại</h3>
        <div className="type-button-box">
          {
            bttnlist.map((cur, index) => (<TypeButton props={cur} key={index}></TypeButton>))
          }
        </div>
        <ComicSection></ComicSection>
      </div>
    </div>
  )
}

function TypeButton({ props }) {
  return (
    <div className="type-button-container">
      <button className="type-button" to="">
        <h3 className="type-button-text">{props.text}</h3>
      </button>
    </div>
  )
}