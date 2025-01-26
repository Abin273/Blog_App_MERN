import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { logout } from "../../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toastMessage } from "../../../utils/toastMessage";

function Navbar() {
    const { userName } = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { data } = await axios.post("/api/user/logout");
            toastMessage(data.message, "success");
            dispatch(logout());
            navigate("/");
        } catch (error) {
            toastMessage("logout failed", "error");
        }
    };
    return (
        <>
            <nav className="navbar">
                <div className="user-name">
                    <Link to="/"> Blog App</Link>
                </div>
                <div className="right-side-part">
                    <ul className="navbar-links">
                        <li>
                            <p className="nav-items">
                                <Link to="/user/profile">{userName}</Link>
                            </p>
                        </li>
                        <li>
                            <p className="nav-items" onClick={handleLogout}>
                                Logout
                            </p>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
