import { connect } from "mongoose";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs'; 
import CollegeAuthority from "../models/CollegeAuthority.js"; // Make sure to adjust the import path

dotenv.config(); // Load environment variables from .env

const connectDB = async () => {
    try {
        const connectionString = process.env.MONGO_URI;
        if (!connectionString) {
            console.log("Please specify the MONGODB_URI in .env file");
            process.exit(1);
        }

        await connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");

        // Call function to create the admin user after DB is connected
        createAdminUser();
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // Exit the process if connection fails
    }
};

// Function to create the admin user if it doesn't exist
const createAdminUser = async () => {
    try {
        // Check if admin user already exists
        const existingAdmin = await CollegeAuthority.findOne({ email: "admin@example.com", type: "admin" });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            const admin = new CollegeAuthority({
                name: "Super Admin",
                email: "admin@example.com",
                password: hashedPassword,
                type: "admin", // Assigning 'admin' type
                isPasswordSet: true,
                isLoginAllowed: true,
            });

            await admin.save();
            console.log("Admin created successfully.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (err) {
        console.error("Error creating admin user:", err);
    }
};

export default connectDB;
