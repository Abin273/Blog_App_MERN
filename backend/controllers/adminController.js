import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateAdminToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc   signup admin
// @route  POST /api/admin/signup
// @access Public
export const signUp = async (req, res) => {
	try {
		const { adminName, email, password } = req.body;
		const isAdminExist = await Admin.findOne({ email: email });
		if (isAdminExist) {
			res.status(400);
			throw new Error("admin already exist");
		}

		const saltRounds = 10;
		const hashPassword = await bcrypt.hash(password, saltRounds);
		const admin = await Admin.create({
			adminName,
			email,
			password: hashPassword,
		});
		const adminWithoutSensitiveData = {
			adminName: admin.adminName,
			email: admin.email,
		};

		res.status(201).json({
			message: "admin added successfully...",
			admin: adminWithoutSensitiveData,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc   login admin
// @route  POST /api/admin/login
// @access Public
export const loggIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await Admin.findOne({ email: email });
		if (!admin)
			return res.status(400).json({ error: "Invalid Credentials!" });

		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch){
			res.status(400);
			throw new Error("invalid name or password")
		}
			
		const adminWithoutSensitiveData = {
			id:admin._id,
			adminName: admin.adminName,
			email: admin.email,
		};

		generateAdminToken(res, admin._id);
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
		const users = await User.find({}).lean().select("-password");
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
		console.log(user);
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
