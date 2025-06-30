import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import chatRoutes from "./routes/chat.route.js";
import {connectDB} from "./config/db.js"
import userRoutes from './routes/user.route.js'
import cors from "cors";
dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(cors({
  origin:"http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(express.json());
app.use(cookieParser());
 //routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

 

app.listen(PORT, () => {
  console.log(`server is runnning on port ${PORT}`);
  connectDB();
});