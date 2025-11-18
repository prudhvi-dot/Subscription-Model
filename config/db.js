import { connect } from "mongoose";

export async function connectDB() {
    try{
        await connect(process.env.MONGO_URL);
        console.log("Database Connected");
    }
    catch(error) {
        console.log(error);
    }
}