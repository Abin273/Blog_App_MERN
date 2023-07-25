import React from "react";
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
	const { userName } = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const { data } = await axios.post("/api/user/logout");
			toast.warn(data.message,{position: toast.POSITION.TOP_CENTER});
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<nav className="navbar">
				<div className="user-name"><Link to="/"> Blog App</Link></div>
				<div className="right-side-part">
					<ul className="navbar-links">
						<li>
							<p className="nav-items"><Link to="/user/profile">{userName}</Link></p>
						</li>
						<li >
							<p className="nav-items" onClick={handleLogout}>Logout</p>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
