import React from 'react';

import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import ErrorModal from './components/ErrorModal';
import HabsList from './components/HabsList';

import Header from './components/Header';
import HomeAuthorsList from './components/HomeAuthorsList';
import HomePosts from './components/HomePosts';
import UserComments from './components/UserComments';
import UserFavoritePosts from './components/UserFavoritePosts';
import UserPosts from './components/UserPosts';
import UserProfile from './components/UserProfile';
import UserSubs from './components/UserSubs';
import { useAppDispatch } from './Hooks/useAppDispatch';
import Create from './pages/Create';
import Hab from './pages/Hab';
import HabCreate from './pages/HabCreate';
import Login from './pages/Login';
import Post from './pages/Post';
import Posts from './pages/Posts';
import Register from './pages/Register';
import Search from './pages/Search';
import UserPage from './pages/UserPage';
import UserSettings from './pages/UserSettings';
import { fetchAuth } from './Redux/Slices/AuthSlice';
import HabPosts from './components/HabPosts';
import HabAuthors from './components/HabAuthors';
import axios from 'axios';

function App() {
  // ======== location
  const location = useLocation()
  // ======== location

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  React.useEffect(() => {
    if(location.pathname === '/'){
      navigate('/flows/all/all/1')
    }
  },[])

  // ======== get auth user
  const auth = async () => {
    const data: any = await dispatch(fetchAuth())

    if (data.paylaod) {
      if ('accessToken' in data.payload) {
        window.localStorage.setItem('token', data.payload.accessToken);
      }
    }
  }

  const qwe = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/all/all/1`,{
      headers: {
        "Referrer-Policy": "no-referrer",
        "Access-Control-Allow-Credentials": true
      }
    })
    console.log(data)
  }

  React.useEffect(() => {
    auth()
    // qwe()
  },[])
  // ======== get auth user

  return (
    <>
      <Header />
      <ErrorModal />

      <Routes>
        <Route path='/post/:id' element={<Post />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/all' element={<Posts />} />
        <Route path='/post/create' element={<Create />} />
        <Route path='/search/:page' element={<Search />} />
        <Route path='/flows/:category/' element={<Posts />} >
          <Route path=':type/:page' element={<HomePosts />} />
          <Route path='habs/:page' element={<HabsList />} />
          <Route path='authors/:page' element={<HomeAuthorsList />} />
        </Route>
        <Route path='/hab/create' element={<HabCreate />} />
        {/* <Route path='/hab/:habId/:type/:page' element={<Hab />} /> */}
        <Route path='/hab/:habId/' element={<Hab />}>
          <Route path='posts/:page' element={<HabPosts />} />
          <Route path='authors/:page' element={<HabAuthors />} />
        </Route>
        <Route path='/user/:id/' element={<UserPage />}>
          <Route path='profile' element={<UserProfile />} />
          <Route path='posts/:page' element={<UserPosts />} />
          <Route path='comments/:page' element={<UserComments />} />
          <Route path='favorites/:page' element={<UserFavoritePosts />} />
          <Route path=':category/:page' element={<UserSubs />} />
        </Route>
        <Route path='/user/settings' element={<UserSettings />} />
      </Routes>
    </>
  );
}

export default App;
