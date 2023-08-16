import './home.css'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { getAllComic,getRankingBoard,getFollowedComic } from "../../api/comic"
import { useEffect, useState } from 'react';
import { ComicSection } from '../../components/comic/comic';

export default function Home() {
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState([])
  
  async function loadDataPage() {
    const comics = await getAllComic()
    const ranks = await getRankingBoard()
    setComic(comics.data.data.listComic)
    setRank(ranks.data.data.rankingList)
  }

  useEffect(() => {
    loadDataPage()
  }, [])

  return (
    <div className="homepage-container">
      <div className="homepage-body">
        <ComicSection title="Danh Sách Truyện" data={comic}></ComicSection>
        <span className='tableSection'>
        <Table name="Bảng Xếp Hạng" data={rank}></Table>
        <Table name="Truyện Đang Theo Dõi" ></Table>
        </span>
      </div>
    </div>
  )
}

function Table({name, data}){
  return (
    <div className="homepage-table-container">
      <h3 className="homepage-table-name">{name}</h3>
      {data ?
        (data.map((cur, index) => (<Row key={index} data={cur}></Row>)))
        : 
        (<div className='homepage-empty-row'>Trống</div>)
      }
    </div>
  )
}

function Row({ data }){
  return (
    <Link className="homepage-row-container" to="">
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