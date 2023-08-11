import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Comic from './pages/comic/comic'
import Follow from './pages/follow/follow'
import Login from './pages/login/login'
import Register from './pages/register/register'
import MainComic from './pages/main_comic/main_comic'
import Layout from './layout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="comic" element={<Comic />} />
          <Route path="follow" element={<Follow />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="comic/main-comic" element={<MainComic />} /> 
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
