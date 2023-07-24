import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {update} from "../../../redux/userSlice"


function EditProfile() {
	const user = useSelector(state => state.user);
	console.log(user);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const updatedUser = {
		name,
		email,
		password
	}

	const handleUpdate = (e)=>{
		e.preventDefault()
		dispatch(update(updatedUser));

	}

  return (
    <div className="container">
			<h1>Edit Profile</h1>
			<div class="profile-container">
				<div class="profile-image">
					<img src="profile.jpg" alt="User Profile Image" />
				</div>
				<div class="profile-details">
				<input
					className="input"
					type="text"
					name="userName"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					className="input"
					type="email"
					name="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					className="input"
					type="password"
					name="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				</div>
				<div class="edit-button">
					<button onClick={handleUpdate} >Update</button>
				</div>
			</div>
		</div>
  )
}

export default EditProfile
