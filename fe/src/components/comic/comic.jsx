import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import './comic.css'

export function ComicSection({ title, data }) { 
    return (
      <div className="section">
        {
          title ?
          (<h3 className="section-title">{title + ' >'}</h3>)
          : null
        }
        <div className="section-container">
        { 
            data ?
            (data.map((cur, index) => (<Comic key={index} data={cur}></Comic>)))
            : null
        }
        </div>
      </div>
    )
  }
  
  function Comic({data}) {
    return (
      <div className="comic-container">
        <Link className="section-comic" to={`/type-comic/main-comic/${data._id}`}>
          <img className="secion-comic-img" src={data.coverURL} alt={data.nameComics} />
          <div className="section-comic-info">
            <h3 className="section-comic-name">{data.nameComics}</h3>
            <div className="section-comic-stats">
              <span className="section-stat-wrap">
                <FaEye className="section-stat-icon"/>
                <h3 className="section-stat-number">{data.view}</h3>
              </span>
              <span className="section-stat-wrap">
                <AiFillStar className="section-stat-icon"/>
                <h3 className="section-stat-number">{data.ratingAvg}</h3>
              </span>
            </div>
          </div>
        </Link>
      </div>
    )
  }