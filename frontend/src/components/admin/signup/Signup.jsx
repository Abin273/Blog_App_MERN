import React, { useState } from "react";
import "./Signup.css";

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = () => {};
	const goToLogin = () => {};

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
					<p className="alerady" onClick={goToLogin}>
						Alerady have an account..
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
