import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Navbar.css" 
import { logout } from "../../../redux/adminSlice";
import { toastMessage } from "../../../utils/toastMessage";

function Navbar() {

	const { adminName } = useSelector((state) => state.admin.adminInfo);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(()=>{
		document.title = "User management admin"
	},[])
	
	const handleLogout = async () => {
		try {
			const { data } = await axios.post("/api/admin/logout");
			toastMessage(data.message, 'success')
			
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.error(error);
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
