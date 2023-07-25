import React from "react";
import "./Profile.css";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate()

	const user = useSelector(state => state.user.userInfo);
	const handleSubmit = (e)=>{
		e.preventDefault();
	}

	return (
		<div className="container">
			<h1>Your Profile</h1>
			<div className="profile-container">
				<div className="profile-image">
					<img src="profile.jpg" alt="User Profile Image" />
				</div>
				
				<div className="profile-details">
					<h2>{user.userName}</h2>
					<p>{user.email}</p>
				</div>
				<div className="edit-button">
					<button onClick={()=>{navigate('/user/editProfile')}}>Edit</button>
				</div>
				<form onSubmit={handleSubmit} >
					<div className="" style={{display:"block"}}>
					Add a profile image
					<input type="file" name="image" />
					<input type="submit" value="Upload" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Profile;
