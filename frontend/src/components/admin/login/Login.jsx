import React, { useState } from "react";
import "./Login.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = ()=>{

	}

	const goToLogin = ()=>{
		
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
					<p className="new" onClick={goToLogin}>
						Create an account?
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
