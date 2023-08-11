import './home.css'
import { Link } from 'react-router-dom'
import '../../assets/fontawesome-icon/css/all.css'

export default function Home() {
  return (
    <div className="homepage-container">
      <div className="homepage-body">
        <Section title="Top truyện hot"></Section>
        <Section title="Truyện mới"></Section>
        <Section title="Tác giả mới"></Section>
      </div>
    </div>
  )
}

function Section({ title }) {
  const in4 = {
    img: 'https://i.ex-cdn.com/mgn.vn/files/content/2022/10/09/cover-chainsaw-man-1512.jpeg',
    name: 'Chainsaw man (this is a really good comic)',
    view: '1.234K',
    comment: '1.234K',
    rating: 4.8
  }
  
  return (
    <div className="section">
      <h3 className="section-title">{title + ' >'}</h3>
      <div className="section-slider">
        <Comic data={in4}></Comic>
        <Comic data={in4}></Comic>
        <Comic data={in4}></Comic>
        <Comic data={in4}></Comic>
        <Comic data={in4}></Comic>
        <Comic data={in4}></Comic>
      </div>
    </div>
  )
}

function Comic({data}) {
  return (
  <Link className="section-comic" to=''>
    <img className="secion-comic-img" src={data.img} alt="" />
    <div className="section-comic-info">
      <h3 className="section-comic-name">{data.name}</h3>
      <div className="section-comic-stats">
        <div className="section-stat-wrap">
          <i className="fa-solid fa-eye section-stat-icon"></i>
          <h4 className="section-stat-number">{data.view}</h4>
        </div>
        <div className="section-stat-wrap">
          <i className="fa-solid fa-comment section-stat-icon"></i>
          <h4 className="section-stat-number">{data.comment}</h4>
        </div>
        <div className="section-stat-wrap">
          <i className="fa-solid fa-star section-stat-icon"></i>
          <h4 className="section-stat-number">{data.rating}</h4>
        </div>
      </div>
    </div>
  </Link>
  )
}

