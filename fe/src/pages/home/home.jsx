import './home.css'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { getAllComic,getRankingBoard,getFollowedComic } from "../../api/comic"
import { useEffect, useState } from 'react';
export default function Home() {
  const [comic, setComic] = useState([])
  const [rank, setRank] = useState([])
  
  async function loadDataPage() {
    const comics = await getAllComic()
    const ranks = await getRankingBoard()
    console.log(comics)
    // console.log(ranks)
    setComic(comics.data.data.listComic)
    setRank(ranks.data.data.rankingList)
  }

  useEffect(() => {
    loadDataPage()
  }, [])
  console.log(comic)
  // console.log(rank)

  const exampleTable = [
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    }
  ]

  const exampleSection = [
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    },
    {
      img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
      name: 'Chainsaw man (thêm dòng này để tên nó dài ra để test css)',
      view: '1.234K',
      comment: '1.234K',
      rating: 4.8 
    }
  ]

  return (
    <div className="homepage-container">
      <div className="homepage-body">
        <Section title="Danh Sách Truyện" data={exampleSection}></Section>
        <span className='tableSection'>
        <Table name="Bảng Xếp Hạng" data={exampleTable}></Table>
        <Table name="Truyện Đang Theo Dõi" ></Table>
        </span>
      </div>
    </div>
  )
}

function Section({ title, data }) { 
  return (
    <div className="section">
      <h3 className="section-title">{title + ' >'}</h3>
      <div className="section-container">
      {
        data.map((cur, index) => (<Comic key={index} data={cur}></Comic>))
      }
      </div>
    </div>
  )
}

function Comic({data}) {
  return (
    <div className="comic-container">
      <Link className="section-comic" to=''>
        <img className="secion-comic-img" src={data.img} alt="" />
        <div className="section-comic-info">
          <h3 className="section-comic-name">{data.name}</h3>
          <div className="section-comic-stats">
            <span className="section-stat-wrap">
              <FaEye className="section-stat-icon"/>
              <h3 className="section-stat-number">{data.view}</h3>
            </span>
            <span className="section-stat-wrap">
              <AiFillStar className="section-stat-icon"/>
              <h3 className="section-stat-number">{data.rating}</h3>
            </span>
          </div>
        </div>
      </Link>
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
      <img className="homepage-row-img" src={data.img} alt="" />
      <div className="homepage-row-info">
        <h3 className="homepage-row-name">{data.name}</h3>
        <span className="homepage-row-stat">
          <span className="homepage-row-stat-wrap">
            <FaEye className="homepage-row-stat-icon"/>
            <h3 className="homepage-row-stat-number">{data.view}</h3>
          </span>
          <span className="homepage-row-stat-wrap">
            <MdModeComment className="homepage-row-stat-icon"/>
            <h3 className="homepage-row-stat-number">{data.comment}</h3>
          </span>
          <span className="homepage-row-stat-wrap">
            <AiFillStar className="homepage-row-stat-icon"/>
            <h3 className="homepage-row-stat-number">{data.rating}</h3>
          </span>
        </span>
      </div>
    </Link>
  )
}