import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/userSlice';

function Navbar() {
    const user = useSelector(state => state.user);
    console.log("store state ",user);
    const dispatch = useDispatch();

    function handleLogout(){
        console.log("hi");
        dispatch(logout())
    }

  return (
    <>
    <nav className="navbar">
        <div className="user-name">User Name</div>
        <div className="right-side-part">
        <ul className="navbar-links">
            <li>
                {console.log("hi",user.email)}
               <p className='nav-items'>{user.userName}</p>
            </li>

            <li>
                <p>Login</p>
            </li>
            <li>
               <p onClick={handleLogout}>Logout</p>
            </li>
        </ul>
        </div>
    </nav></>
  )
}

export default Navbar
