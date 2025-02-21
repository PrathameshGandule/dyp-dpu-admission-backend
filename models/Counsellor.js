import { Schema, model } from "mongoose";

const counsellorSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["desk1", "desk2", "desk3", "desk4"], required: true }
}, { timestamps: true });

export default model("Counsellor", counsellorSchema);