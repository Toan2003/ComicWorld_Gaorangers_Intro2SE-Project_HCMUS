import './home.css'
import { Link } from 'react-router-dom'
import { getAllComic,getRankingBoard,getFollowedComic } from "../../api/comic"
import { useEffect, useState } from 'react';
import { ComicSection } from '../../components/comic/comic';
import { Table } from '../../components/rankingBoard/rankingBoard';

export default function Home() {
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState(undefined)
  const [follow, setFollow] = useState(undefined)

  let id = localStorage.getItem('id')
  // console.log(id)
  
  async function loadDataPage() {
    const comics = await getAllComic()
    const ranks = await getRankingBoard()

    if (id == 'null') {
      // console.log('1')
      setFollow(undefined)
    }
    else {
      // console.log('2')
      const follows = await getFollowedComic(id)
      setFollow(follows.data.data.followList.fullComic)
    }

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
          <Table name="Truyện Đang Theo Dõi" data ={follow}></Table>
        </span>
      </div>
    </div>
  )
}

