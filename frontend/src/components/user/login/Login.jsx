import React, { useState } from "react";
import "./Login.css";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";


function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const dispatch = useDispatch()


	const handleLogin = async(e)=>{
		e.preventDefault();
		if(email === "" || password === "") return;

		try {
			const {data} = await axios.post("http://localhost:4000/api/user/login",{email,password});
			console.log("user",data);
			console.log("user",data.user.email);
			const stateData = {
				id:data.user.id,
				userName:data.user.userName,
				email:data.user.email,
				isBlocked:data.user.isBlocked
			}
			if(!data.user){
				toast.error("errr 1")
				navigate('/');
			}else{
				toast.success(data.message)
				dispatch(login(stateData))
				navigate('/user/home')
			}
		} catch (error) {
			toast.error("errr 2")
			console.error(error)
		}


	}
	return (
		<div className="container">
			<div className="login-wrapper">
				<div>
					<h1>User Login</h1>
				</div>
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
					<button className="login-button" onClick={handleLogin}>
						Login
					</button>
					<p>or</p>
					<p className="new">
						<Link to="/user/signup">Create an account?</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
