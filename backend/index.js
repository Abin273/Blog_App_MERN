import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //for parsing form data
app.use(express.json()); //for parsing json
app.use(cookieParser());

connectDb();

//user router assigning
app.use("/api/user", userRoutes);

//admin router assigning
app.use("/api/admin", adminRoutes);

// app.use('/api/admin/auth', adminAuthRouter);
// app.use('/api/admin/users', adminUserManagement);

//blog router assigning
app.use("/api/blog", blogRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server startes on http://localhost:${PORT}`);
});
