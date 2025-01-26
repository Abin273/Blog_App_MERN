import './App.css';
import UserLoginPage from './pages/user/UserLoginPage'
import UserSignupPage from './pages/user/UserSignupPage'
import UserHomePage from './pages/user/UserHomePage'
import ProfilePage from './pages/user/ProfilePage'
import EditProfilePage from './pages/user/EditProfilePage'

import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminHomePage from './pages/admin/AdminHomePage'

import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.userInfo);
  const admin = useSelector(state => state.admin.adminInfo);
  return (
    <>
      <ToastContainer style={{marginTop:"58px"}} />
      <Routes>
        {/* USER ROUTES */}
        <Route path='/' exact element={user ? <Navigate to="/user/home" /> : <Navigate to="/user/login" />} />
        <Route path='/user/login' element={!user ? <UserLoginPage /> : <Navigate to="/" />} />
        <Route path='/user/signup' element={!user ? <UserSignupPage /> : <Navigate to="/" />} />
        <Route path='/user/home' element={user ? <UserHomePage /> : <Navigate to="/" />} />
        <Route path='/user/profile' element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path='/user/editProfile' element={user ? <EditProfilePage /> : <Navigate to="/" />} />


        {/* ADMIN ROUTES */}
        <Route path='/admin' element={admin ? <Navigate to="/admin/home" /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/login' element={!admin ? <AdminLoginPage /> : <Navigate to="/admin" />} />
        <Route path='/admin/home' element={admin ? <AdminHomePage /> : <Navigate to="/admin" />} />

      </Routes>
    </>
  );
}


export default App;
