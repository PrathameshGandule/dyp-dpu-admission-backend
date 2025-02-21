import { Schema, model } from "mongoose";

const gateRegistrationSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default model("GateRegistration", gateRegistrationSchema);