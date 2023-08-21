import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Comic from './pages/comic/comic'
import Follow from './pages/follow/follow'
import Login from './pages/login/login'
import Register from './pages/login/register'
import MainComic from './pages/main_comic/main_comic'
import Profile from './pages/profile/profile'
import Layout from './layout'
import UploadComic from './pages/new_comic/new_comic'
import TypeComic from './pages/type_comic/type_comic'
import Search from './pages/search/search'
import UploadChapter from './pages/upload_chapter/upload_chapter'
// import ManageAccount from './pages/profile/manage/manageaccount'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="type-comic" element={<TypeComic />} />
          <Route path="follow" element={<Follow />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="type-comic/main-comic/:id" element={<MainComic />} />
          <Route path="type-comic/main-comic/:idComic/:idChapter" element={<Comic />} />
          <Route path="profile/Dashboard" element={<Profile />} />
          <Route path="profile/upload" element={<UploadComic />} />
          <Route path="search-result" element={<Search />} />
          <Route path="upload-chapter" element={<UploadChapter />} />
          {/* <Route path="profile/Dashboard/manage-account" element={<ManageAccount />}/> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
