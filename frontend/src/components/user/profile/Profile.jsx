import React from "react";
import "./Profile.css";
import { useSelector } from 'react-redux';

function Profile() {

	const name = useSelector(state => state.user.name);
	const email = useSelector(state => state.user.email);
	return (
		<div className="container">
			<h1>Your Profile</h1>
			<div class="profile-container">
				<div class="profile-image">
					<img src="profile.jpg" alt="User Profile Image" />
				</div>
				<div class="profile-details">
					<h2>{name}</h2>
					<p>{email}</p>
				</div>
				<div class="edit-button">
					<button>Edit</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;
