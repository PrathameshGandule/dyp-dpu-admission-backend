import { Schema, model } from "mongoose";

const collegeAuthoritySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isPasswordSet: { type: Boolean, default: false },
    isLoginAllowed: { type: Boolean, default: true },
    otp: { type: String },
    timeForOperation: { type: Date },
    type: { type: String, enum: ["gate", "desk1", "desk2", "desk3", "admin"], required: true }
}, { timestamps: true });

export default model("CollegeAuthority", collegeAuthoritySchema);