import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { login } from "../../../redux/adminSlice";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async(e)=>{
		e.preventDefault();
		if(email === "" || password === "") return;

		try {
			const {data} = await axios.post("/api/admin/login",{email,password},{withCredentials:true});
			console.log("admin after axios",data);
			if(!data.admin){
				toast.error("errr 1")
				navigate('/admin');
			}else{
				toast.success(data.message)
				dispatch(login({
					id:data.admin.id,
					userName:data.admin.adminName,
					email:data.admin.email,
				}))
				navigate('/admin/home')
			}
		} catch (error) {
			toast.error(error.response.data.error)
			console.error(error)
		}
	}

	return (
		<div className="container">
			<div className="login-wrapper">
				<div>
					<h1>Admin Login</h1>
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
					<Link to="/admin/signup">Create an account?</Link>
						
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
