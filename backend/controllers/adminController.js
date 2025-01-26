import { generateAdminToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc   login admin
// @route  POST /api/admin/login
// @access Public
export const loggIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const adminId = process.env.ADMIN_ID

		const adminEmail = process.env.ADMIN_EMAIL
		const adminPassword = process.env.ADMIN_PASSWORD

		if(email !== adminEmail || password !== adminPassword){
			return res.status(400).json({ error: "Invalid Credentials!" });
		}
		
		
		const adminWithoutSensitiveData = {

			adminName: "admin",
			email,
		};

		generateAdminToken(res, adminId);
		res.status(201).json({
			message: "Loggined successfully...",
			admin: adminWithoutSensitiveData,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   get all users
// @route  GET /api/admin/allUsers
// @access Private
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password").lean();
		res.status(200).json({ users });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   block or unblock a user
// @route  PUT /api/admin/handleBlock/:id
// @access Private
export const blockUnblockUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id).select('-password');
		user.isBlocked = !user.isBlocked;
		const afterUpdate = await user.save();
		res.status(200).json({ message: `${afterUpdate.isBlocked ? "blocked" : "unblocked"}`,users:afterUpdate })
	} catch (err) {
		res.status(404).json({ error: err.message })
	}
}

// @desc   logout admin
// @route  POST /api/admin/logout
// @access Public
export const logOut = async (req, res) => {
	try {
		res.cookie("jwtAdmin", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		res.status(200).json({ message: "admin logged out." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
