import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import connectDb from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();

app.use(cors({
	origin: 'http://localhost:3000'
}));



app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); //for parsing form data
app.use(express.json()); //for parsing json
app.use(cookieParser()); // for parsing cookie data

connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

//user router assigning
app.use("/api/user", userRoutes);

//admin router assigning
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server startes on http://localhost:${PORT}`);
});
