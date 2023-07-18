import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateAdminToken } from "../config/generateToken.js";

// REGISTER ADMIN
export const signUp = async (req, res) => {
	try {
		const { adminName, email, password } = req.body;
		const isAdminExist = await Admin.findOne({ email: email });
		if (isAdminExist) {
			return res.status(400).json({ error: "admin already exist" });
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


//LOGGIN ADMIN
export const loggIn = async (req, res) => {
    try {
		const { email, password } = req.body;
		const admin = await Admin.findOne({ email: email });
		if (!admin)
			return res.status(400).json({ error: "Invalid Credentials!" });


		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch)
			return res
				.status(400)
				.json({ error: "invalid name or password" });

		const adminWithoutSensitiveData = {
			adminName: admin.adminName,
			email: admin.email,
		};

		generateAdminToken(res, admin._id);
		res.status(201).json({
			message: "Loggined successfully...",
			admin: adminWithoutSensitiveData ,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

//LOGOUT ADMIN
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
