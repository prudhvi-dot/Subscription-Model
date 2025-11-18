import express from "express";
import { config } from "dotenv";
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import subscriptionRoutes from "./routes/subscribtionRoutes.js"
import { connectDB } from "./config/db.js";
connectDB();

const app = express();

app.get("/",(req,res)=> {
    res.send("Home");
})

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/subscription", subscriptionRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> {
    console.log("server running");
})

export default app;