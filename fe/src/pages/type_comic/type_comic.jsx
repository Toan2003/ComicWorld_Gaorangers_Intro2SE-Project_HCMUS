import './type_comic.css'
import { Link } from 'react-router-dom'
import { ComicSection } from '../../components/comic/comic'
import { useState, useEffect } from 'react'
import { getComicAccordingToType } from "../../api/comic"


export default function TypeComic() {
  const typeList = [
    {
      text: 'Action'
    },
    {
      text: 'Romance'
    },
    {
      text: 'Horror'
    }
  ]

  const [comic, setComic] = useState([])
  const [typeTitle, setTypeTitle] = useState(undefined)

  async function handleClickTypeButton(typeName) {
    const comics = await getComicAccordingToType({type : typeName})
    setComic(comics.data.data.listComic)
    setTypeTitle('Danh sách truyện thể loại ' + typeName)
  }

  return (
    <div className="type-container">
      <div className="type-body">
        <h3 className="type-title">Thể Loại</h3>
        <div className="type-button-box">
          {
            typeList.map((cur, index) => (<TypeButton clickFunction={() => handleClickTypeButton(cur.text)} text={cur.text} key={index}></TypeButton>))
          }
        </div>
        <ComicSection title={typeTitle} data={comic}></ComicSection>
      </div>
    </div>
  )
}

function TypeButton({ clickFunction, text }) {
  return (
    <div className="type-button-container">
      <button onClick={clickFunction} className="type-button" to="">
        <h3 className="type-button-text">{text}</h3>
      </button>
    </div>
  )
}