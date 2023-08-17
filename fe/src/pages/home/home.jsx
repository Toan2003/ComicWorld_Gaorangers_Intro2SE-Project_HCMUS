import './home.css'
import { getAllComic,getRankingBoard,getFollowedComic } from "../../api/comic"
import { useEffect, useState } from 'react';
import { ComicSection } from '../../components/comic/comic';
import { Table } from '../../components/rankingBoard/rankingBoard';

export default function Home() {
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState(undefined)
  const [follow, setFollow] = useState(undefined)
  
  async function loadDataPage() {
    const comics = await getAllComic()
    const ranks = await getRankingBoard()
    const follows = await getFollowedComic('64d8ed909e43edfe49b84fd9')
    setComic(comics.data.data.listComic)
    setRank(ranks.data.data.rankingList)
    setFollow(follows.data.data.followList.fullComic)
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
          <Table name="Truyện Đang Theo Dõi" data ={follow}></Table>
        </span>
      </div>
    </div>
  )
}

