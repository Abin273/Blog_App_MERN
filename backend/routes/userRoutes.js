import express from "express";
import {
	signUp,
	loggIn,
	logOut,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();


// REGISTER USER
router.post("/signup",upload.single('image'), signUp);

//LOGGIN USER
router.post("/login", loggIn);

router
	.route("/profile")
	.get(userAuth, getUserProfile)
	.put(userAuth, updateUserProfile);

//LOGOUT USER
router.post("/logout", logOut);

export default router;
