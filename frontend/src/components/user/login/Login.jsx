import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

import { login } from "../../../redux/userSlice";
import { toastMessage } from "../../../utils/toastMessage";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
			toastMessage("All fields (email, password) are required", 'error')
            return;
        }

        try {
            const {data} = await axios.post(
                "/api/user/login",
                { email, password },
                { withCredentials: true }
            );
			if(data){
				toastMessage(data.message, 'success')
				
				dispatch(
                    login({
                        id: data.user._id,
                        userName: data.user.userName,
                        email: data.user.email,
                        image: data.user.image,
                        isBlocked: data.user.isBlocked,
                    })
                );
                navigate("/user/home");

			}
        } catch (error) {
            toastMessage(error.response.data.error, 'error');
            console.error(error);
        }
    };
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
