import React from "react";
import "./UserHome.css";
import welcomeImg from "../../../assets/images/welcomeback.png"


function UserHome() {
	
	return (
		<div className="img-user-home">
				<img src={welcomeImg} alt="" />
			</div>
	);
}

export default UserHome;
