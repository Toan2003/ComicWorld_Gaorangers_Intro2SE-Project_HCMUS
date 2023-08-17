import Member from "../../components/member/member"
import Uploader from '../../components/uploader/uploader'
import Admin from '../../components/admin/admin'
// import { getLogin, getSignup } from "../../api/authorize"
import './styles.css' 
import { useContext } from "react";
import { AuthProvider } from "../../context/context"
import { useEffect, useState } from "react";

export default function Profile() {
  const context = useContext(AuthProvider)
  const [profileUser, setProfileUser] = useState(<Member />)

  // useEffect(() => {
  //   handleProfile()
  // }, [profileUser])

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
      {profileUser}
    </div>
  );
}