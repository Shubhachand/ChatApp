import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./config/db.js"
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
 //routes
app.use("/api/auth",authRoutes);

 

app.listen(PORT, () => {
  console.log(`server is runnning on port ${PORT}`);
  connectDB();
});