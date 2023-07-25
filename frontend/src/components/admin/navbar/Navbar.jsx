import React from "react";
import "./Navbar.css" 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../../../redux/adminSlice";

function Navbar() {

	const { adminName } = useSelector((state) => state.admin.adminInfo);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const handleLogout = async () => {
		try {
			const { data } = await axios.post("/api/admin/logout");
			toast.warn(data.message);
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
			<>
            <nav className="navbar">
				<div className="admin-panel">Admin Panel</div>
				<div className="right-side-part">
                <ul className="navbar-links">
					<li>
						<Link to="/user/profile">{adminName}</Link>
					</li>
					<li>
					<p className="nav-items" onClick={handleLogout}>Logout</p>
					</li>
				</ul>
                </div>
			</nav></>
	);
}

export default Navbar;
