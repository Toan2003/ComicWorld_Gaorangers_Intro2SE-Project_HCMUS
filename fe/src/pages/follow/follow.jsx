import './follow.css'
import {  } from "../../api/comic"
import { ComicSection } from '../../components/comic/comic';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/context';
import { Link } from 'react-router-dom'
import { getFollowedComic } from "../../api/comic"

export default function Follow() {
  const context = useContext(AuthContext)
  const checkAuthen = localStorage.getItem('authenticated')
  const [follow, setFollow] = useState(undefined)
  let userId = localStorage.getItem('id')

  async function loadDataPage() {
    if (userId != 'null') {
      const follows = await getFollowedComic(userId)
      setFollow(follows?.data?.data?.followList?.fullComic)
    }
    else {
      setFollow(undefined)
    }
  }

  useEffect(() => {
    loadDataPage()
  }, [])

  
  return (
    <div className="follow-container">
      <div className="follow-body">
        {
          checkAuthen == 'true' && context.authenticated ? 
          (
            <ComicSection title="Những truyện bạn đang theo dõi" data={follow} ></ComicSection>
          )
          :
          (
            <h3 className="follow-not_logged_in">
              Vui lòng <Link className="follow-link" to="/login">Đăng Nhập</Link> để thực hiện chức năng này
            </h3>
          )
        }
      </div>
    </div>  

  )
}