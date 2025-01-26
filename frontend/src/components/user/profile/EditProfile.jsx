import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {update} from "../../../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { toastMessage } from '../../../utils/toastMessage';

function EditProfile() {
	const user = useSelector(state => state.user.userInfo);
	const [name, setName] = useState(user.userName);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const updatedUser = {
		userName:name,
		email,
		password
	}

	const handleUpdate = async (e)=>{
		e.preventDefault()
		const response = await axios.put("/api/user/profile",updatedUser,{withCredentials:true});
		dispatch(update(updatedUser));
		toastMessage(response.data.message, "success");
		navigate("/user/profile")
	}

  return (
    <div className="container">
			<h1>Edit Profile</h1>
			<div className="profile-container">
				<div className="profile-details">
				<input
					className="input"
					type="text"
					name="userName"
					placeholder="userName"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					className="input"
					type="email"
					name="email"
					placeholder='email'

					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					className="input"
					type="password"
					placeholder='password'
					name="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				</div>
				<div className="edit-button">
					<button onClick={handleUpdate} >Update</button>
				</div>
			</div>
		</div>
  )
}

export default EditProfile
