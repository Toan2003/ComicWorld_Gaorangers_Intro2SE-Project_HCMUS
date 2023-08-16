import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Comic from './pages/comic/comic'
import Follow from './pages/follow/follow'
import Login from './pages/login/login'
import Register from './pages/login/register'
import MainComic from './pages/main_comic/main_comic'
import Profile from './pages/profile/profile'
import Layout from './layout'
import TypeComic from './pages/type_comic/type_comic'

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
          <Route path="type-comic/main-comic" element={<MainComic />} />
          <Route path="type-comic/main-comic/comic" element={<Comic />} />
          <Route path="profile/Dashboard" element={<Profile />} /> 
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
