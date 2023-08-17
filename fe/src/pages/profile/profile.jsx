import Member from "../../components/member/member"
import Uploader from '../../components/uploader/uploader'
import Admin from '../../components/admin/admin'
// import { getLogin, getSignup } from "../../api/authorize"
import './styles.css' 
import { useContext } from "react";
import { AuthProvider } from "../../context/context"
import Login from '../login/login'
import { useEffect, useState } from "react";

export default function Profile() {
  const context = useContext(AuthProvider)
  
  // useEffect(() => {
  //   console.log(context.idUser, context.typeUser)
  // }, [])
  const [profileUser, setProfileUser] = useState(<Member />)

  const handleProfile = () => {
    if (context.typeUser == 'member') {
      setProfileUser(<Member />)
    }
    else if (context.typeUser == 'uploader') {
      setProfileUser(<Uploader />)
    }
    else if (context.typeUser == 'admin') {
      setProfileUser(<Admin />)
    }
  }

  return (
    <div className="profile">
      <Member />
      
    </div>
  );
}