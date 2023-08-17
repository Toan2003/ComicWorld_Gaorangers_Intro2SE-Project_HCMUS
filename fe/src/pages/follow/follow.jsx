import './follow.css'
import {  } from "../../api/comic"
import { ComicSection } from '../../components/comic/comic';
import { useContext } from 'react'
import { AuthContext } from '../../context/context';
import { Link } from 'react-router-dom'

export default function Follow() {
  const context = useContext(AuthContext)
  const checkAuthen = localStorage.getItem('authenticated')

  return (
    <div className="follow-container">
      <div className="follow-body">
        {
          checkAuthen == 'true' && context.authenticated ? 
          (
            <ComicSection title="Những truyện bạn đang theo dõi"></ComicSection>
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