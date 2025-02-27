import { Schema, model } from "mongoose";

const collegeAuthoritySchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["desk1", "desk2", "desk3", "gate"], required: true }
}, { timestamps: true });

export default model("CollegeAuthority", collegeAuthoritySchema);