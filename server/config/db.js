import dns from "node:dns/promises";
import mongoose from "mongoose";

// Use a reliable public DNS resolver for Atlas SRV lookups.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log("Database connected"))
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.error("Database connection failed:", error.message)
        throw error
    }
}

export default connectDB;