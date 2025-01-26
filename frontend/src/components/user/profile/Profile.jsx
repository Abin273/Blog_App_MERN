import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { uploadImageToFIrebase } from "../../../utils/uploadImage";
import { update } from "../../../redux/userSlice";
import { toastMessage } from "../../../utils/toastMessage";
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.userInfo);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toastMessage("select an image to update", "warn");
            return;
        }
        try {
            setLoading(true);

            const url = await uploadImageToFIrebase(image);
            const response = await axios.put(
                "/api/user/profile",
                { image: url },
                { withCredentials: true }
            );
            setImage(null);
            const updatedUser = {
                image: url,
            };
            dispatch(update(updatedUser));
            toastMessage(response.data.message, "success");
        } catch (error) {
            toastMessage("image upload failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Your Profile</h1>
            <div className="profile-container">
                <div className="profile-image">
                    <img src={user.image} alt="imageNotAvailable" />
                </div>

                <div className="profile-details">
                    <h2>{user.userName}</h2>
                    <p>{user.email}</p>
                </div>
                <div className="edit-button">
                    <button
                        onClick={() => {
                            navigate("/user/editProfile");
                        }}
                    >
                        Edit
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "block" }}>
                        Add a profile image:
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <span className="submitbutton">
                            {loading ? (
                                "Uploading..."
                            ) : (
                                <input
                                    type="submit"
                                    value="Upload image"
                                    style={{
                                        width: 100,
                                        color: "blue",
                                        background: "yellow",
                                    }}
                                />
                            )}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
