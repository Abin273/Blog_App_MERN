import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: trusted,
		},
		title: {
			type: String,
			required: true,
			min: 4,
		},
		description: {
			type: String,
			required: true,
			min: 10,
		},
		photo: String,
		category: {
			type: String,
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog