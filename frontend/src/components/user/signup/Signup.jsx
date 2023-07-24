import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async(e) => {
		e.preventDefault();
		if(name === '' || email === '' || password === '') return;
		try {
			const user = await axios.post("http://localhost:4000/api/user/signup",{ userName:name, email, password });
			console.log("inserted",user);
			if(!user.data){
				toast.error("user already exist")
				navigate('/signup')
			}else{
				toast.success(user.data.message);
				navigate('/');
			}
		} catch (error) {
			console.log("errrrrrrrrrrrrr");
			toast.error("error")
			console.log(error);
		}
	};

	return (
		<div className="container">
			<div className="signup-wrapper">
				<div>
					<h1>User Signup</h1>
				</div>

				<input
					className="input"
					type="text"
					name="userName"
					placeholder="Enter your name"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					className="input"
					type="email"
					name="email"
					placeholder="Enter your email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					className="input"
					type="password"
					name="password"
					placeholder="Enter your password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<div className="buttons">
					<button className="signup-button" onClick={handleSignup}>
						Signup
					</button>
					<p>or</p>
					<p className="alerady">
						<Link to="/">Alerady have an account..</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
