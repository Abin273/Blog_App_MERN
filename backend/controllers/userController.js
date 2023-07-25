import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// @desc   signup user
// @route  POST /api/user/signup
// @access Public
export const signUp = async (req, res) => {
	try {
		const { userName, email, password} = req.body;
		console.log("Hi");
		console.log(req.files);
		const isUserExist = await User.findOne({ email: email });
		if (isUserExist) {
			res.status(400);
			throw new Error("user already exist");
		}

		const saltRounds = 10;
		const hashPassword = await bcrypt.hash(password, saltRounds);
		const user = await User.create({
			userName,
			email,
			password: hashPassword,
			image:image.filename
		});
		const userWithoutSensitiveData = {
			userName: user.userName,
			email: user.email,
			isBlocked: user.isBlocked,
		};
		res.status(201).json({
			message: "user added successfully...",
			user: userWithoutSensitiveData,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   login user
// @route  POST /api/user/login
// @access Public
export const loggIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user)
			return res.status(401).json({ error: "Invalid Credentials!" });

		if (user.isBlocked)
			return res.status(403).json({ error: "your account is blocked." });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(400)
				.json({ error: "invalid userName or password" });

		const userWithoutSensitiveData = {
			id: user._id,
			userName: user.userName,
			email: user.email,
			isBlocked: user.isBlocked,
		};

		generateToken(res, user._id);
		res.status(201).json({
			message: "Loggined successfully...",
			user: userWithoutSensitiveData,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   get user profile
// @route  GET /api/user/profile
// @access Private
export const getUserProfile = async (req, res) => {
	try {
		const userWithoutSensitiveData = {
			id: req.user._id,
			userName: req.user.userName,
			email: req.user.email,
		};
		res.status(200).json({
			message: "user profile",
			user: userWithoutSensitiveData,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   update user profile
// @route  PUT /api/user/profile
// @access Private
export const updateUserProfile = async (req, res) => {
	try {
		console.log(req.user, "kkkkkdfdsfs");
		const user = await User.findById(req.user._id);

		if (user) {
			user.userName = req.body.userName || user.userName;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				const saltRounds = 10;
				const hashPassword = await bcrypt.hash(
					req.body.password,
					saltRounds
				);
				user.password = hashPassword;
			}
			const updatedUser = await user.save();
			const userWithoutSensitiveData = {
				id: updatedUser._id,
				userName: updatedUser.userName,
				email: updatedUser.email,
			};
			res.status(200).json({
				message: "user profile updated",
				user: userWithoutSensitiveData,
			});
		} else {
			res.status(404)
			throw new Error("user not found");
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   logout user
// @route  POST /api/user/logout
// @access Public
export const logOut = (req, res) => {
	try {
		res.cookie("jwt", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		res.status(200).json({ message: "user logged out." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
