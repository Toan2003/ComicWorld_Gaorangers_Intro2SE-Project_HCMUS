import './rankingBoard.css';
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

export function Table({name, data}){
  console.log(data)
    return (
      <div className="homepage-table-container">
        <h3 className="homepage-table-name">{name}</h3>
        <div className="homepage-table-row-wrapper">
          {
            data.length > 0 ?
            (data.map((cur, index) => (<Row key={index} data={cur}></Row>)))
            : 
            (<div className='homepage-empty-row'>Trống</div>)
          }
        </div>
      </div>
    )
}


function Row({ data }){
return (
    <Link className="homepage-row-container" to={`/type-comic/main-comic/${data._id}`}>
    <img className="homepage-row-img" src={data.coverURL} alt="" />
    <div className="homepage-row-info">
        <h3 className="homepage-row-name">{data.nameComics}</h3>
        <span className="homepage-row-stat">
        <span className="homepage-row-stat-wrap">
            <FaEye className="homepage-row-stat-icon"/>
            <h3 className="homepage-row-stat-number">{data.view}</h3>
        </span>
        <span className="homepage-row-stat-wrap">
            <AiFillStar className="homepage-row-stat-icon"/>
            <h3 className="homepage-row-stat-number">{data.ratingAvg}</h3>
        </span>
        </span>
    </div>
    </Link>
)
}