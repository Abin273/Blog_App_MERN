import './App.css';
import UserLoginPage from './pages/user/UserLoginPage'
import UserSignupPage from './pages/user/UserSignupPage'
import UserHomePage from './pages/user/UserHomePage'
import ProfilePage from './pages/user/ProfilePage'
import EditProfilePage from './pages/user/EditProfilePage'

import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminSignupPage from './pages/admin/AdminSignupPage'

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        {/* USER ROUTES */}
        <Route path='/' exact element={<UserLoginPage />} />
        <Route path='/user/signup' element={<UserSignupPage />} />
        <Route path='/user/home' element={<UserHomePage />} />
        <Route path='/user/profile' element={<ProfilePage />} />
        <Route path='/user/editProfile' element={<EditProfilePage />} />


        {/* ADMIN ROUTES */}
        <Route path='/admin' element={<AdminLoginPage />} />
        <Route path='/admin/home' element={<AdminHomePage />} />
        <Route path='/admin/signup' element={<AdminSignupPage />} />

      </Routes>
    </>
  );
}


export default App;
