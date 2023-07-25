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
	const dispatch = useDispatch();


	const handleLogin = async(e)=>{
		e.preventDefault();
		if(email === "" || password === "") return;

		try {
			const {data} = await axios.post("/api/user/login",{email,password},{withCredentials:true});
			console.log("user after axios",data);
			if(!data.user){
				toast.error("errr 1",{position: toast.POSITION.TOP_CENTER})
				navigate('/');
			}else{
				toast.success(data.message,{position: toast.POSITION.TOP_CENTER})
				dispatch(login({
					id:data.user.id,
					userName:data.user.userName,
					email:data.user.email,
					isBlocked:data.user.isBlocked
				}))
				navigate('/user/home')
			}
		} catch (error) {
			toast.error(error.response.data.error || error.error,{position: toast.POSITION.TOP_CENTER})
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
