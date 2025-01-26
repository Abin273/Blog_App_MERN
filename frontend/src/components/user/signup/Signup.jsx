import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { toastMessage } from "../../../utils/toastMessage";
import {uploadImageToFIrebase} from "../../../utils/uploadImage"

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        // Validate fields
        if (!name || !email || !password || !image) {
            toastMessage(
                "All fields (name, email, password, and image) are required",
                "error"
            );

            return;
        }
        try {
            const imageUrl = await uploadImageToFIrebase(image);

            const response = await axios.post("/api/user/signup", {
                userName: name,
                email,
                password,
                image: imageUrl,
            });

            if (response) {
                toastMessage(response.data.message, "success");
                navigate("/");
            }
        } catch (error) {
			toastMessage(error?.response?.data?.error, "error");
            console.error(error);
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

                <br />
                <img
                    alt="Profile pic"
                    width="150px"
                    height="125px"
                    src={image ? URL.createObjectURL(image) : ""}
                ></img>

                <br />
                <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                />

                <br />
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
