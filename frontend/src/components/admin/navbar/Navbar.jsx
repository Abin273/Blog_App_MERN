import React from "react";
import "./Navbar.css" 

function Navbar() {
	return (
			<>
            <nav class="navbar">
				<div class="admin-panel">Admin Panel</div>
				<div className="right-side-part">
                <ul class="navbar-links">
					<li>
						<a href="#">Profile</a>
					</li>
                    
                    <li>
						<a href="#">Login</a>
					</li>
					<li>
						<a href="#">Logout</a>
					</li>
				</ul>
                </div>
			</nav></>
	);
}

export default Navbar;
