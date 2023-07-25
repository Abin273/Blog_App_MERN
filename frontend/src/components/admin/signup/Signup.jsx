import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async(e) => {
		e.preventDefault();
		if(name === "" ||  email === '' || password === '') return;
		try {
			const admin = await axios.post("http://localhost:4000/api/admin/signup",{adminName:name,email,password});
			console.log("admin after insert",admin);
			if(!admin.data){
				toast.error("admin already exist!");
				navigate("/admin/signup")
			}else{
				toast.success(admin.data.message)
				navigate("/admin")
			}
		} catch (error) {
			toast.error(error.response.data.error)
			console.error(error);
		}
	};

	return (
		<div className="container">
			<div className="signup-wrapper">
				<div>
					<h1>Admin Signup</h1>
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
						<Link to="/admin/login">Alerady have an account..</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
