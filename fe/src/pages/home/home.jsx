import './home.css'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { getAllComic,getRankingBoard,getFollowedComic } from "../../api/comic"
import { useEffect, useState } from 'react';
import { ComicSection } from '../../components/comic/comic';
import { Table } from '../../components/rankingBoard/rankingBoard';

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
        <span className= 'comic-section'>
          <ComicSection title="Danh Sách Truyện" data={comic}></ComicSection>
        </span>
        <span className='tableSection'>
          <Table name="Bảng Xếp Hạng" data={rank}></Table>
          <Table name="Truyện Đang Theo Dõi" ></Table>
        </span>
      </div>
    </div>
  )
}

