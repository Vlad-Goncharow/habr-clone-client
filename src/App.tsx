import React from 'react';

import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import ErrorModal from './components/ErrorModal';

import Header from './components/Header';
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
      navigate('/flows/all/all')
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

  React.useEffect(() => {
    auth()
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
        <Route path='/search' element={<Search />} />
        <Route path='/flows/:category/:type' element={<Posts />} />
        <Route path='/hab/create' element={<HabCreate />} />
        <Route path='/hab/:habId/:type' element={<Hab />} />
        <Route path='/user/:id/:category' element={<UserPage />} />
        <Route path='/user/settings' element={<UserSettings />} />
      </Routes>
    </>
  );
}

export default App;
